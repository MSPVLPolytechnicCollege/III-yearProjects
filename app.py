
#import sqlite
import sqlite3

from flask import Flask, render_template, request, redirect, url_for,session

app=Flask(__name__)
app.secret_key="123"

@app.route('/')
@app.route('/loginpage')
def home():
    return render_template('loginpage.html')


@app.route('/register',methods=['GET','POST'])
def register():
    if request.method=="POST":
        n = request.form['name']
        e = request.form['email']
        m = request.form['mobile']
        pw = request.form['password']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into register(name,email,mobile_no,password) values(?,?,?,?);", (n, e, m, pw))
        con.commit()
        con.close()
    return render_template('register.html')
    #return redirect (url_for('loginpage.html'))

#login page code

@app.route('/confirm',methods=['GET','POST'])
def login():
    if request.method=='POST':
        u = request.form['name']
        p = request.form['password']
        con = sqlite3.connect('charity.db')
        #con.row_factory=sqlite3.Row
        cursor = con.cursor()
        #cursor.execute("insert into lgn(uname,password) values(?,?);", (u, p))
        cursor.execute("select * from register where name=? and password=?", (u,p))
        #data=cursor.fetchone()

        """if data:
            session["name"]= data["name"]
            session["password"] = data["password"]
            return redirect("sucess.html")
        else:
            print("username and password missmatch")
    return redirect(url_for('loginpage.html'))
        #con.commit()
        #con.close()"""
        return render_template('confirm.html')
    return redirect (url_for('loginpage.html'))

@app.route('/sucess',methods=['GET','POST'])
def sucess():
    return render_template("sucess.html")










if __name__ == "__main__":
    app.run(debug=True)

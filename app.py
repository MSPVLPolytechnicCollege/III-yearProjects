
#import sqlite
import sqlite3
#import modules
from flask import Flask, render_template, request, redirect, url_for,session

app=Flask(__name__)
app.secret_key="123"

#Emty router and loginpage
@app.route('/')
def firstpage():
    return render_template('firstpage.html')

#login page router
@app.route('/loginpage')
def home():
    return render_template('loginpage.html')

#adminpage
@app.route('/admin',methods=['GET','POST'])
def admipage():
    if request.method=="POST":
        ad_nm = request.form['ad_name']
        ad_pd = request.form['ad_password']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into admin(ad_name,ad_password) values(?,?);", (ad_nm,ad_pd))
        con.commit()
        con.close()
    return render_template('admindashboard.html')

#registerform
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
        u= request.form['name']
        p= request.form['password']
        con = sqlite3.connect('charity.db')
        con.row_factory=sqlite3.Row
        cursor = con.cursor()
        #cursor.execute("insert into lgn(uname,password) values(?,?);", (, p))
        cursor.execute("select * from register where name=? and password=?;", (u,p))
        data=cursor.fetchone()
#compare the data name&password
        if data:
            session["name"]= data['name']
            session["password"] = data['password']
            return redirect("sucess")  #call the success in router
        else:
            return ("Mismatch the password and username")
    return redirect(url_for("sucess.html"))
        #con.commit()
        #con.close()

#compare this router
@app.route('/sucess',methods=['GET','POST'])
def sucess():
    return render_template("sucess.html")









#Main  file
if __name__ == "__main__":
    app.run(debug=True)

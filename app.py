

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
#about page
@app.route('/about',methods=['GET','POST'])
def about():
    return render_template("about.html")

#ourimpact page
@app.route('/ourimpact',methods=['GET','POST'])
def ourimpact():
    return render_template("ourimpact.html")


#adminpage
@app.route('/admin',methods=['GET','POST'])
def admipage():
    if request.method=="POST":
        ad_nm = request.form['ad_name']
        ad_pd = request.form['ad_pass']
        con = sqlite3.connect('charity.db')
        con.row_factory = sqlite3.Row
        cursor = con.cursor()
        # cursor.execute("insert into lgn(uname,password) values(?,?);", (, p))
        cursor.execute("select * from admin where ad_name=? and ad_pass=?;", (ad_nm, ad_pd))
        data = cursor.fetchone()
    # compare the data name&password
        if data:
            session["ad_name"]= data['ad_name']
            session["ad_pass"] = data['ad_pass']
            return redirect("adboard")  #call the success in router
        else:
            return ("Mismatch the password and username")
    #return redirect(url_for("sucess.html"))
        #con.commit()
        #con.close()

    return render_template('admin.html')# return the admin.html page

# call the route
@app.route('/adboard',methods=['GET','POST'])
def adboard():
    return render_template("adboard.html")

# contact the route
@app.route('/contact',methods=['GET','POST'])
def contact():
    if request.method=="POST":
        n = request.form['name']
        e = request.form['email']
        m = request.form['phone']
        pw = request.form['address']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into contact(name,email,phone,address) values(?,?,?,?);", (n, e, m, pw))
        con.commit()
        con.close()
    return render_template("contact.html")

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


#donate form
@app.route('/donate',methods=['GET','POST'])
def donate():
    if request.method=="POST":
        n = request.form['name']
        e = request.form['email']
        m = request.form['phone']
        add = request.form['address']
        pay = request.form['payment']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into donate(name,email,phone,address,payment) values(?,?,?,?,?);", (n, e, m,add,pay))
        con.commit()
        con.close()
    return render_template('donate.html')

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









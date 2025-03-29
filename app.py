
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

#get the admin form using button
@app.route('/admin1')
def admin1():
  return redirect(url_for("admin.html"))

#get the login form using button
@app.route('/login1')
def login1():
  return redirect(url_for("loginpage.html"))


# rouetr the chart
@app.route('/chart')
def chart():
    return render_template('chart.html')

#login page router
@app.route('/loginpage')
def home():
    return render_template('loginpage.html')

#contactus page router
@app.route('/cnttbl')
def cnttbl():
    return render_template('contacttbl.html')

#chart page router
@app.route('/chart')
def chart():
    return render_template('chart.html')

#about page
@app.route('/about',methods=['GET','POST'])
def about():
    return render_template("about.html")

#adminpage
@app.route('/admin',methods=['GET','POST'])
def admipage():
    if request.method=="POST":
        ad_nm = request.form['ad_name']
        ad_pd = request.form['ad_pass']
        con = sqlite3.connect('charity.db')
        con.row_factory = sqlite3.Row
        cursor = con.cursor()
        cursor.execute("select * from admin where ad_name=? and ad_pass=?;", (ad_nm, ad_pd))
        data = cursor.fetchone()
    # compare the data name&password
        if data:
            session["ad_name"]= data['ad_name']
            session["ad_pass"] = data['ad_pass']
            return redirect("admindashboard")  #call the success in router
        else:
            return ("Mismatch the password and username")
    return render_template('admin.html')# return the admin.html page


#donate & control  details table
@app.route('/view')
def view():
    con = sqlite3.connect('charity.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from dnt')
    res = cursor.fetchall()
    return render_template("view.html", datas=res)


# contact details table
@app.route('/contacttbl')
def contacttbl():
    con = sqlite3.connect('charity.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from contact')
    res = cursor.fetchall()
    return render_template("contacttbl.html", datas=res)


# contact the route
@app.route('/contact',methods=['GET','POST'])
def contact():
    if request.method=="POST":
        n1 = request.form['name1']
        n2 = request.form['name2']
        e = request.form['email']
        ph = request.form['phone']
        msg = request.form['msg']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into contact(name1,name2,email,phone,msg) values(?,?,?,?,?);", (n1,n2,e,ph,msg))
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
        return redirect (url_for('loginpage'))
    return render_template('register.html')


#donate form
@app.route('/donate',methods=['GET','POST'])
def donate():
    if request.method=="POST":
        n = request.form['name']
        e = request.form['uname']
        m = request.form['phone']
        add = request.form['address']
        c = request.form['city']
        pi = request.form['pincode']
        st = request.form['state']
        amt = request.form['amount']
        dt = request.form['dtetme']
        mth = request.form['mth']
        wf = request.form['weekField']
        con = sqlite3.connect('charity.db')
        cursor = con.cursor()
        cursor.execute("insert into dnt (name, uname, phone, address,city,pincode,state,amount,dtetme,mth,weekField) values(?,?,?,?,?,?,?,?,?,?,?);", (n, e, m,add,c,pi,st,amt,dt,mth,wf))
        con.commit()
        con.close()
        return  redirect(url_for('payment'))
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


#sucess  router
@app.route('/sucess',methods=['GET','POST'])
def sucess():
    return render_template("sucess.html")
#gallery
@app.route('/gallery',methods=['GET','POST'])
def gallery():
    return render_template("gallery.html")

# login page
@app.route('/loginpage',methods=['GET','POST'])
def loginpage():
    return render_template("loginpage.html")

#payment page
@app.route('/payment',methods=['GET','POST'])
def payment():
    return render_template("payment.html")

#upi  page
@app.route('/upI',methods=['GET','POST'])
def upi():
    return render_template("upI.html")

#admin dashboard page
@app.route('/admindashboard',methods=['GET','POST'])
def admindashboard():
    return render_template("admindashboard.html")






#Main  file
if __name__ == "__main__":
    app.run(debug=True)

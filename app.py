
from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3

app = Flask(__name__)

app.secret_key="123"


@app.route('/')
@app.route('/login')
def home():
    return render_template('login-stu.html')


@app.route('/student-home')
def stuhome():
    con=sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from event')
    res = cursor.fetchall()
    return render_template("home-stu.html", datas=res)


@app.route('/success')
def success():
    return render_template('success.html')

con = sqlite3.connect('alumini_db.db')
con.execute("create table if not exists student(regno integer primary key, sname text, email text unique ,username text unique,password text,confirmpass text) ")
con.close()

con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS event (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        event_date TEXT,
        event_location TEXT,
        event_time TEXT,
        event_des TEXT
    );
""")


con=sqlite3.connect('alumini_db.db')
con.execute("create table if not exists admin1(username text primary key,password text);")
con.close()

#Register the student details
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            regno = request.form["stu_reg"]
            sname = request.form["stu_name"]
            email = request.form["stu_email"]
            username = request.form["stu_user"]
            password = request.form["stu_pass"]
            confirmpass = request.form["stu_con-pass"]

            if password != confirmpass:
                return render_template('error.html', message="Passwords do not match.")

            con = sqlite3.connect('alumini_db.db')
            cursor = con.cursor()
            cursor.execute("insert into student(regno,sname,email,username,password,confirmpass) values(?,?,?,?,?,?);", (regno,sname,email,username,password,confirmpass))
            con.commit()
            # Redirect to the 'success' page and pass the message
            return render_template('success.html', message="Registered Successfully.")

        except:
            return render_template('error.html', message="Registration failed. Details: " )
        finally:
            return redirect(url_for('home'))
            con.close()
    return render_template('register-stu.html')

@app.route('/admin')
def admin_dashboard():
    return render_template('admin.html')

#admin login page to verify
@app.route('/adminlogin',methods=['GET','POST'])
def admin():
    if request.method=='POST':
        username = request.form['admin-name']
        password = request.form["admin-pass"]
        con = sqlite3.connect('alumini_db.db')
        con.row_factory = sqlite3.Row  # select query use pana ithu use panuvo to select the row
        cursor = con.cursor()
        cursor.execute("select * from admin1 where username=? and password=?;", (username, password))
        data = cursor.fetchone()  # to fetch only one day that username and password

        if data:
            session['username'] = data['username']
            session['password'] = data['password']
            return redirect(url_for("admin_dashboard"))
        else:
            return render_template('error.html', message="Username and Password Mismatch.")
    return render_template('login-admin.html')

#student login and to check and verify
@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='POST':
        username = request.form['stu-name']
        password = request.form["stu-pass"]
        con=sqlite3.connect('alumini_db.db')
        con.row_factory=sqlite3.Row #select query use pana ithu use panuvo to select the row
        cursor=con.cursor()
        cursor.execute("select * from student where username=? and password=?;" ,(username,password))
        data=cursor.fetchone() #to fetch only one day that username and password

        if data:
            session['username']=data['username']
            session['password']=data['password']
            return redirect(url_for("stuhome"))
        else:
            return render_template('error.html', message="Username and Password Mismatch.")

    return redirect(url_for("home"))


@app.route('/signup')
def signup():
    return render_template('register-stu.html')



@app.route('/aluminilogin')
def alumini():
    return render_template('login-alumini.html')


#Update
@app.route('/forgot', methods=["GET", "POST"])
def updateData():
    if request.method == 'POST':
        # Retrieve form data
        forgot_s_user = request.form['forgot-stu-name']
        forgot_s_pass = request.form['forgot-stu-pass']
        forgot_s_con = request.form['forgot-stu-conpass']

        try:
            # Connect to the database
            con = sqlite3.connect('alumini_db.db')
            cursor = con.cursor()
            cursor.execute('select username from student where username=?',(forgot_s_user))
            result = cursor.fetchall()

            # Check if the username matches the route parameter
            if result is None or forgot_s_user != username:
                return render_template('error.html', message="Username mismatch. Please try again.")

            # Update the password in the database
            cursor.execute(
                "UPDATE student SET password=? confirmpass=?  WHERE username=?",


                (forgot_s_pass, forgot_s_user)
            )

            # Check if the update was successful
            if cursor.rowcount == 0:
                return render_template('error.html', message="Username not found. Please try again.")

            # Commit the changes and close the connection
            con.commit()
            con.close()

            # Redirect to a success page
            return render_template('success.html', message="Password updated successfully!")

        except:
            return render_template('error.html', message="An error occurred")


    return render_template('update-stu.html')

#event to be view on the student
@app.route('/event-details')
def eventdetail():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from event')
    res = cursor.fetchall()
    return render_template("event-details.html", datas=res)


#Event to be add
@app.route('/add-event',methods=['GET','POST'])
def addevent():
    if request.method=="POST":
        date=request.form['event-date']
        location=request.form['event-location']
        time=request.form['event-time']
        des=request.form['event-des']
        con=sqlite3.connect('alumini_db.db')
        cursor=con.cursor()
        cursor.execute('insert into event(event_date,event_location,event_time,event_des) values(?,?,?,?)',(date,location,time,des))
        con.commit()
        con.close()
        return redirect(url_for('admin_dashboard'))
    return render_template('event.html')

#update the event
@app.route('/view_update_event')
def updateevent():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from event')
    res = cursor.fetchall()
    return render_template("update-event.html", datas=res)

#Delete the event by admin
@app.route('/view_update_event/<string:sno>',methods=['GET','POST'])
def deleteUsers(sno):
    con=sqlite3.connect('alumini_db.db')
    cursor=con.cursor()
    cursor.execute('delete from event where sno=?',(sno,))
    con.commit()
    con.close()
    return redirect(url_for('updateevent'))


if __name__=='__main__':
    app.secret_key = '1234'
    app.run(debug=True)
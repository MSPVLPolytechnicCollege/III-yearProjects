
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
    return render_template('home-stu.html')

@app.route('/success')
def success():
    return render_template('success.html')

con = sqlite3.connect('alumini__db.db')
con.execute("create table if not exists student(regno integer primary key, sname text, email text unique ,username text unique,password text,confirmpass text) ")
con.close()


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

            con = sqlite3.connect('alumini__db.db')
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


@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=='POST':
        username = request.form['stu-name']
        password = request.form["stu-pass"]
        con=sqlite3.connect('alumini__db.db')
        con.row_factory=sqlite3.Row #select query use pana ithu use panuvo to select the row
        cursor=con.cursor()
        cursor.execute("select * from student where username=? and password=?;" ,(username,password))
        data=cursor.fetchone() #to fetch only one day that username and password

        if data:
            session['username']=data['username']
            session['password']=data['password']
            return redirect(url_for("stuhome"))
        else:
            return render_template('success.html', message="Username and Password Mismatch.")

    return redirect(url_for("home"))
@app.route('/update')
def update_stu():
    return render_template('update-stu.html')

@app.route('/update/<string:id>',methods=['GET','POST'])
def update(username):
    return render_template('update-stu.html')

@app.route('/signup')
def signup():
    return render_template('register-stu.html')

@app.route('/adminlogin')
def admin():
    return render_template('login-admin.html')


'''
@app.route('/success', methods=["GET", "POST"])
def insertData():
    if request.method == 'POST':
        u = request.form['stu-name']
        p = request.form["stu-pass"]
        con = sqlite3.connect('alumini__db.db')
        cursor = con.cursor()
        cursor.execute("insert into stu_login(username,password) values(?,?);", (u, p))
        con.commit()
        con.close()
        # Redirect to the 'success' page and pass the message
        return render_template('success.html', message="Login successfully.")
    return redirect(url_for('home'))
'''






'''
@app.route('/forgot/<string:username>', methods=["GET", "POST"])
def updateData():
    if request.method == 'POST':
        forgot_s_user = request.form['forgot-stu-name']
        forgot_s_pass = request.form['forgot-stu-pass']
        con = sqlite3.connect('alumini_db.db')
        cursor = con.cursor()
        cursor.execute("update student set password=? where username=?",(forgot_s_pass,forgot_s_user))
        con.commit()  # commit will give it will execute on the db
        con.close()
        return render_template('success.html')
    return redirect(url_for('home'))
'''


@app.route('/forgot/<string:username>', methods=["GET", "POST"])
def updateData(username):
    if request.method == 'POST':
        # Retrieve form data
        forgot_s_user = request.form['forgot-stu-name']
        forgot_s_pass = request.form['forgot-stu-pass']

        try:
            # Connect to the database
            con = sqlite3.connect('alumini_db.db')
            cursor = con.cursor()

            # Check if the username matches the route parameter
            if forgot_s_user != username:
                return render_template('error.html', message="Username mismatch. Please try again.")

            # Update the password in the database
            cursor.execute(
                "UPDATE stu_login SET password=? WHERE username=?",
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

        except Exception as e:
            return render_template('error.html', message=f"An error occurred: {str(e)}")

    # If the request method is GET, show the forgot password form
    return render_template('forgot_password.html', username=username)


if __name__=='__main__':
    app.run(debug=True)

import os
from flask import Flask, render_template, request, redirect, url_for, flash, session,jsonify
import sqlite3
import base64 #Base64 use pannurathu browser-la image store & display panna best option.


app = Flask(__name__)

app.secret_key="123"

UPLOAD_FOLDER='static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

#contact table
con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS contact1 (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        stu_name  text,
        stu_email TEXT,
        stu_contact integer,
        subject TEXT,
        message TEXT
    );
""")


# alumni contact table
con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS alumni_contact (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        stu_name  text,
        stu_email TEXT,
        stu_contact integer,
        subject TEXT,
        message TEXT
    );
""")

#course table
con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS course (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        course TEXT ,
        active text
    );
""")


#alumni register table
con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS alumni1 (
        alumni_name  text,
        alumni_pass text,
        alumni_email TEXT PRIMARY KEY,
        alumni_phone integer,
        graduation integer,
        dob integer,
        course text,
        address text
    );
""")
con.close()


#gallery
con=sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE if not exists image1 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image BLOG,
    description text
    );
""")
con.close()

con=sqlite3.connect('alumini_db.db')
con.execute("create table if not exists admin1(username text primary key,password text);")
con.close()

#request-job table
con = sqlite3.connect('alumini_db.db')
con.execute("""
    CREATE TABLE IF NOT EXISTS job_request (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        company  text,
        job_location TEXT,
        job_title text,
        qualification TEXT,
        description TEXT,
        key_skills TEXT,
        job_package TEXT,
        experience TEXT,
        num_vacancy TEXT,
        reference_email TEXT,
        last_date integer,
        contact text
    );
""")

#table for the accepted job after click the accept button
con = sqlite3.connect("alumini_db.db")
cursor = con.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS accepted_jobs1 (
        sno INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT,
        job_location TEXT,
        job_title TEXT,
        qualification TEXT,
        description TEXT,
        key_skills TEXT,
        job_package TEXT,
        experience TEXT,
        num_vacancy INTEGER,
        reference_email TEXT,
        last_date TEXT,
        contact text
    )
''')
con.commit()
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

@app.route('/alumni_dashboard')
def alumni_dashboard():
    return render_template('alumni.html')



@app.route('/alumni_redirect')
def alumni_redirect():
    return render_template('register-alumini.html')


#register page for alumni
@app.route('/alumni_register', methods=['GET', 'POST'])
def alumni_register():
    if request.method == 'POST':
        try:
            name=request.form['alumini-name']
            password=request.form['alumini-pass']
            email=request.form['alumini-email']
            phone=request.form['alumini-phone']
            graduation=request.form['graduation-year']
            dob=request.form['dob']
            course=request.form['course']
            address=request.form['address']

            con = sqlite3.connect('alumini_db.db')
            cursor = con.cursor()
            cursor.execute("insert into alumni1(alumni_name,alumni_pass,alumni_email,alumni_phone,graduation,dob,course,address) values(?,?,?,?,?,?,?,?);", (name,password,email,phone,graduation,dob,course,address))
            con.commit()
            # Redirect to the 'success' page and pass the message
            return render_template('success.html', message="Registered Successfully.")

        except:
            return render_template('error.html', message="Registration failed. Details: " )
        finally:
            return redirect(url_for('alumni_login'))
    return render_template('register-alumni.html')


@app.route('/total_alumni')
def total_alumni():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from alumni1')
    res = cursor.fetchall()
    return render_template("total-alumni.html", datas=res)

#student data are go to the admin page
@app.route('/total_student')
def total_student():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from student')
    res = cursor.fetchall()
    return render_template("total-student.html", datas=res)

#alumni login page to verif
@app.route('/alumni_login',methods=['GET','POST'])
def alumni_login():
    if request.method=='POST':
        username = request.form['alumini-name']
        password = request.form["alumini-pass"]
        con = sqlite3.connect('alumini_db.db')
        con.row_factory = sqlite3.Row  # select query use pana ithu use panuvo to select the row
        cursor = con.cursor()
        cursor.execute("select * from alumni1 where alumni_name=? and alumni_pass=?", (username, password))
        data = cursor.fetchone()  # to fetch only one day that username and password

        if data:
            session['username'] = data['alumni_name']
            session['password'] = data['alumni_pass']

            return redirect(url_for("alumni_dashboard"))
        else:
            return render_template('error.html', message="Username and Password Mismatch.")
    return render_template('login-alumini.html')



@app.route('/admin')
def admin_dashboard():
    total_events = get_total_events().json['total']  # **Extract integer value from JSON**
    total_contact = get_total_contact().json['total']  
    total_job_request = get_total_job_request().json['total']  
    total_jobs = get_total_jobs_json().json['total']
    total_alumni = get_total_alumni_json().json['total']

    print("Total Events:", total_events)  # Debugging
    print("Total Contact:", total_contact)  # Debugging
    print("Total Job Request:", total_job_request)  # Debugging
    print("Total Job:", total_jobs)  # Debugging
    print("Total Alumni:", total_alumni)  # Debugging

    return render_template('admin.html',
        total_events=total_events, 
        total_contact=total_contact, 
        total_request_job=total_job_request, 
        total_jobs=total_jobs,
        total_alumni=total_alumni
    )


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


#Update the password
@app.route('/update_redirect')
def update_redirect():
    return render_template('update-stu.html')


#Update
@app.route('/forgot', methods=["GET", "POST"])
def forgot():
    if request.method == 'POST':
        # Retrieve form data
        forgot_s_user = request.form['forgot-stu-name']
        forgot_s_pass = request.form['forgot-stu-pass']
        forgot_s_con = request.form['forgot-stu-conpass']

        if forgot_s_pass != forgot_s_con:
            return render_template('error.html', message="Passwords do not match.")
        try:
            # Connect to the database
            con = sqlite3.connect('alumini_db.db')
            cursor = con.cursor()
            cursor.execute('select username from student where username=?', (forgot_s_user,))
            result = cursor.fetchone()

            # Check if the username matches the route parameter
            if result is None :
                return render_template('error.html', message="Username mismatch. Please try again.")

            # Update the password in the database
            cursor.execute(
                "UPDATE student SET password=? ,confirmpass=?  WHERE username=?",
                (forgot_s_pass, forgot_s_con, forgot_s_user))

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
@app.route('/deleteevent/<string:sno>',methods=['GET','POST'])
def deleteevent(sno):
    con=sqlite3.connect('alumini_db.db')
    cursor=con.cursor()
    cursor.execute('delete from event where sno=?',(sno,))
    con.commit()
    con.close()
    return redirect(url_for('updateevent'))

#view the event by alumni
@app.route('/viewevent')
def viewevent():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from event')
    res = cursor.fetchall()
    return render_template("event-alumni.html", datas=res)


@app.route('/stu-contact',methods=['POST','GET'])
def stucontact():
    if request.method=='POST':
        name=request.form['contact-name']
        email = request.form['contact-email']
        contact = request.form['contact-number']
        subject = request.form['contact-subject']
        message = request.form['contact-message']
        con = sqlite3.connect('alumini_db.db')
        cursor = con.cursor()
        cursor.execute('insert into contact1(stu_name,stu_email,stu_contact,subject,message) values(?,?,?,?,?)',(name,email,contact,subject,message))
        con.commit()
        con.close()
        return redirect(url_for('stuhome'))
    return render_template('contact.html')


#contact to be view on the admin
@app.route('/view_contact')
def view_contact():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from contact1')
    res = cursor.fetchall()
    return render_template('contact-view.html',datas=res)


@app.route('/alumni_contact',methods=['POST','GET'])
def alumni_contact():
    if request.method=='POST':
        name=request.form['contact-name']
        email = request.form['contact-email']
        contact = request.form['contact-number']
        subject = request.form['contact-subject']
        message = request.form['contact-message']
        con = sqlite3.connect('alumini_db.db')
        cursor = con.cursor()
        cursor.execute('insert into alumni_contact(stu_name,stu_email,stu_contact,subject,message) values(?,?,?,?,?)',(name,email,contact,subject,message))
        con.commit()
        con.close()
        return redirect(url_for('stuhome'))
    return render_template('contact-alumni.html')


#contact to be view on the alumni
@app.route('/view_contact_alumni')
def view_contact_alumni():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from alumni_contact')
    res = cursor.fetchall()
    return render_template('contact-view-alumni.html',datas=res)



#delete the contact by the admin
@app.route('/deleteevent/<string:sno>',methods=['GET','POST'])
def deletecontact(sno):
    con=sqlite3.connect('alumini_db.db')
    cursor=con.cursor()
    cursor.execute('delete from contact1 where sno=?',(sno,))
    con.commit()
    con.close()
    return redirect(url_for('contact-view.html'))

#to view the courses
@app.route('/course', methods=['GET', 'POST'])
def course():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from course')
    res = cursor.fetchall()
    con.close()
    return render_template('manage_course.html',datas=res)


#Delete the course by admin
@app.route('/deletecourse/<string:sno>',methods=['GET','POST'])
def deletecourse(sno):
    con=sqlite3.connect('alumini_db.db')
    cursor=con.cursor()
    cursor.execute('delete from course where sno=?',(sno,))
    con.commit()
    con.close()
    return redirect(url_for('course'))

#gallery
@app.route('/gallery')
def gallery():
    con = sqlite3.connect('alumini_db.db')
    cursor = con.cursor()
    cursor.execute('SELECT image,description FROM image1')  # Fetching image data
    images = cursor.fetchall()
    con.close()

    # Convert images to Base64 format for display
    image_list = [
        {
            'data': f"data:image/jpeg;base64,{base64.b64encode(img[0]).decode('utf-8')}",
            'description':img[1]
        }
        for img in images
    ]

    return render_template('add-gallery.html', images=image_list)


#student and alumni gallery
@app.route('/stu_gallery')
def stu_gallery():
    con = sqlite3.connect('alumini_db.db')
    cursor = con.cursor()
    cursor.execute('SELECT image,description FROM image1')  # Fetching image data
    images = cursor.fetchall()
    con.close()

     # Convert images to Base64 format for display
    image_list = [
        {
            'data': f"data:image/jpeg;base64,{base64.b64encode(img[0]).decode('utf-8')}",
            'description':img[1]
        }
        for img in images
    ]
    return render_template('stu-alumni-gallery.html', images=image_list)


#gallery - data to be add
@app.route('/insert_image',methods=['GET','POST'])
def insert_image():
    if request.method=='POST':
        if 'image' not in request.files: #Request-la 'image' field irukka-nu check panrom.
            return "No file part" #If image file upload aagala-na, "No file part" nu solli return pannidum.
        
        image=request.files['image'] #User upload panna image-a eduthuttu image variable-la store panrom.
        description=request.form['description']


        if image.filename == '':
            return "No selected file"
        
        # Convert image to binary
        image_data = image.read()

        con=sqlite3.connect('alumini_db.db')
        cursor=con.cursor()
        cursor.execute('insert into image1(image,description) values(?,?)',(image_data,description)) #E.g., static/uploads/example.jpg nu path DB-la store aagum.
        con.commit()
        con.close()
        print("Redirecting to /gallery")  # Debugging log
        return redirect(url_for('gallery'))
    return render_template('/add-gallery.html')

#event count dynamic ka update in the admin page
@app.route('/get_total_events')
def get_total_events():
    conn = sqlite3.connect('alumini_db.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM event")
    total_events = cursor.fetchone()[0]  # Event count fetch pannum

    conn.close()
    return jsonify({'total': total_events})  # **Direct JSON return**

#contact  count dynamic ka update in the admin page
@app.route('/get_total_contact')
def get_total_contact():
    conn = sqlite3.connect('alumini_db.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM contact1")
    total_contact = cursor.fetchone()[0]  # Count fetch pannum

    conn.close()
    return jsonify({'total': total_contact})  # **Direct JSON return**

#alumni can add a job request for the admin redirect
@app.route('/redirect_request_job_admin',methods=['GET','POST'])
def redirect_request_job_admin():
    return render_template('job-posting-alumni.html')


#alumni can add a job request for the admin
@app.route('/request_job_admin',methods=['GET','POST'])
def request_job_admin():
    if request.method=='POST':
        company=request.form['company-name']
        job_location=request.form['job-location']
        job_title=request.form['job-title']
        job_qualification=request.form['job-qualification']
        job_description=request.form['job-description']
        key_skill=request.form['key-skill']
        job_package=request.form['job-package']
        job_experience=request.form['job-experience']
        job_vacancy=request.form['job-vacancy']
        job_email=request.form['job-email']
        job_date=request.form['job-date']
        contact=request.form['contact']
        con = sqlite3.connect('alumini_db.db')
        cursor = con.cursor()
        cursor.execute('insert into job_request(company,job_location,job_title,qualification,description,key_skills,job_package,experience, num_vacancy,reference_email,last_date,contact) values(?,?,?,?,?,?,?,?,?,?,?,?) ',(company,job_location,job_title,job_qualification,job_description,key_skill,job_package,job_experience,job_vacancy,job_email,job_date,contact))
        con.commit()
        con.close()
    return render_template('job-posting-alumni.html')

@app.route('/request_job_show')
def request_job_show():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from job_request')
    res = cursor.fetchall()
    return render_template('job-request-admin.html',datas=res)

@app.route('/alumni_view_job')
def alumni_view_job():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from job_request')
    res = cursor.fetchall()
    return render_template('alumini-view-job.html',datas=res)


#Delete the job by admin
@app.route('/deletejob/<string:sno>',methods=['GET','POST'])
def deletejob(sno):
    con=sqlite3.connect('alumini_db.db')
    cursor=con.cursor()
    cursor.execute('delete from job_request where sno=?',(sno,))
    con.commit()
    con.close()
    return redirect(url_for('admin_dashboard'))

#job-request  count dynamic ka update in the admin page
@app.route('/get_total_job_request')
def get_total_job_request():
    conn = sqlite3.connect('alumini_db.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM job_request")
    total_job_request = cursor.fetchone()[0]  # Job request count fetch pannum

    conn.close()
    return jsonify({'total': total_job_request})  # JSON format la return pannum


# 🔹 Accept panna data new table la insert panna route
@app.route('/save_job', methods=['POST'])
def save_job():
    data = request.json  # JSON data receive pannrom
    conn = sqlite3.connect("alumini_db.db")
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO accepted_jobs1 (sno, company, job_location, job_title, qualification, description, key_skills, job_package, experience, num_vacancy, reference_email, last_date,contact)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    ''', (
        data['sno'], data['company'], data['job_location'], data['job_title'], 
        data['qualification'], data['description'], data['key_skills'], 
        data['job_package'], data['experience'], data['num_vacancy'], 
        data['reference_email'], data['last_date'], data['contact']
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Job request saved successfully!"})  # Success message

@app.route('/job_approved')
def job_approved():
    con = sqlite3.connect('alumini_db.db')
    con.row_factory = sqlite3.Row  # Enables dictionary-style access
    cursor = con.cursor()
    cursor.execute('select * from accepted_jobs1')
    res = cursor.fetchall()
    return render_template('approved-job.html',datas=res)


#approval job request count dynamic ka update in the admin page
@app.route('/get_total_jobs_json')
def get_total_jobs_json():
    conn = sqlite3.connect('alumini_db.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM accepted_jobs1")
    total_jobs = cursor.fetchone()[0]

    conn.close()
    return jsonify({'total': total_jobs})  # JSON format la return pannu

#total alumni count dynamic ka update in the admin page
@app.route('/get_total_alumni_json')
def get_total_alumni_json():
    conn = sqlite3.connect('alumini_db.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM alumni1")
    total_alumni = cursor.fetchone()[0]

    conn.close()
    return jsonify({'total': total_alumni})  # JSON format la return pannu

if __name__=='__main__':
    app.secret_key = '1234'
    app.run(debug=True)

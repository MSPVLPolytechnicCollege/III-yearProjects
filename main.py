from flask import Flask,render_template,request,jsonify
from datetime import datetime
import sqlite3
import pandas as pd

app = Flask(__name__)


# home

@app.route("/")
def home():
    return render_template("admin/index.html")



#sign up
@app.route("/signup")
def signup():
    return render_template('signup.html')



#return login page
@app.route("/login",methods=["POST","GET"])
def login():
    return render_template("login.html")





#insert user
@app.route("/insert_users",methods=["POST","GET"])
def insert_users():
    in_mode = request.form['select']
    in_username = request.form['user_name']
    in_password = request.form['password']
    in_confirmpass = request.form['confirmpassword']


    if in_password == in_confirmpass:
        con = sqlite3.connect("data_base.db")
        cur = con.cursor()
        con.row_factory = sqlite3.Row
        cur.execute("SELECT * FROM users WHERE username=?", (in_username,))

        data = cur.fetchall()
        if data:
            return "user already exist"
        else:
            cur.execute("INSERT INTO users(mode,username,password) VALUES(?,?,?)", (in_mode,in_username, in_password))
            con.commit()
            con.close()
            return render_template("login.html")

    else:

        return "password not match"





@app.route('/login_users',methods=["POST","GET"])
def login_users():
    in_mode = request.form['select']
    user_name = request.form['user_name']
    password = request.form['password']
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from users where username=? and password=? and mode=?",(user_name,password,in_mode))
    data = cur.fetchall()
    if data and in_mode == "admin":
        return render_template("admin/index.html")
    elif data and in_mode == "other":
        return render_template("other/index.html")
    elif data and in_mode == "staff":
        return render_template("staff/index.html")
    else:
        return "invalid user or password"
    



@app.route("/manage_classes",methods=["POST", "GET"])
def manage_classes():
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from all_classes")
    data = cur.fetchall()
    con.close()
    return render_template("admin/manage_classes.html", data=data)
    

@app.route("/manage_classes_staff",methods=["POST", "GET"])
def manage_classes_staff():
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from all_classes")
    data = cur.fetchall()
    con.close()
    return render_template("staff/manage_classes.html", data=data)





@app.route("/create_class", methods=["POST", "GET"])
def create_class():
    try:
        in_classname = request.form['classname']
        in_classid = request.form['classid']
        in_classteacher = request.form['classteacher']
        
        con = sqlite3.connect('data_base.db')
        cur = con.cursor()
        
   
        cur.execute("SELECT COUNT(*) FROM all_classes WHERE classid = ?", (in_classid,))
        if cur.fetchone()[0] > 0:
            return "Class ID already exists."

        
        cur.execute("INSERT INTO all_classes(classname, classid, classteacher) VALUES(?, ?, ?)",
                    (in_classname, in_classid, in_classteacher))
    
        create_table_query = f"""
        CREATE TABLE IF NOT EXISTS {in_classname} (
            slno INTEGER PRIMARY KEY,
            rollno INTEGER,
            name VARCHAR(50),
            p1 INTEGER, p2 INTEGER, p3 INTEGER, p4 INTEGER, p5 INTEGER, p6 INTEGER, p7 INTEGER, p8 INTEGER,
            present INTEGER, absent INTEGER,
            date VARCHAR(50)
        )
        """
        cur.execute(create_table_query)
        
      
        con.commit()
        
        return "Class created and inserted successfully"
    except sqlite3.Error as e:
        con.rollback() 
        return f"Error occurred: {e}"
    finally:
        con.close()  




@app.route("/attendance/<string:classname>",methods=["POST", "GET"])
def attendance(classname):
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    query = f"SELECT * FROM {classname}"
    cur.execute(query)
    data = cur.fetchall()
    con.close()
    return render_template("admin/add_stud.html",data=data,classname=classname)

@app.route('/excel_to_table',methods=["POST", "GET"])
def excel_to_table():
    in_classname = request.form['classname']
    file = request.files['file']
    df = pd.read_excel(file)
    conn = sqlite3.connect("data_base.db")
    df.to_sql(in_classname, conn, if_exists='append', index=False)
    conn.commit()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    query = f"SELECT * FROM {in_classname}"
    cur.execute(query)
    data = cur.fetchall()

    return render_template("admin/add_stud.html",data=data)


@app.route('/del_attendance/<string:classname>', methods=["POST", "GET"])
def del_attendance(classname):
    con = sqlite3.connect("data_base.db")
    cur = con.cursor()
    query = f"DROP TABLE {classname}"
    cur.execute("DELETE FROM all_classes WHERE classname = ?", (classname,))
    cur.execute(query)
    con.commit()
    con.close()
    return "Deleted successfully"


@app.route('/edit_class/<string:classid>', methods=["POST", "GET"])
def edit_class(classid):
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM all_classes WhERE classid=?",(classid,))
    data = cur.fetchone()
    con.close()
    return render_template('admin/add_student_form.html', data=data)


@app.route('/update_class', methods=["POST", "GET"])
def update_class():
    if request.method == 'POST':
        in_classname = request.form['classname']
        in_classid = request.form['classid']
        in_classteacher = request.form['classteacher']
        in_oldclassname = request.form['oldclassname']
        con = sqlite3.connect('data_base.db')
        cur = con.cursor()
        query = F"ALTER TABLE {in_oldclassname} RENAME TO {in_classname}"
        cur.execute(query)
        cur.execute("UPDATE all_classes SET classname= ?, classteacher=? WHERE classid=?", 
                    (in_classname, in_classteacher, in_classid)) 
        
        con.commit()
        con.close()
        return "Updated Successfully"
    
@app.route('/staff_view_attendance/<string:classname>', methods=["POST", "GET"])
def staff_view_attendance(classname):
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    query = f"SELECT * FROM {classname}"
    cur.execute(query)
    data = cur.fetchall()
    con.close()
    return render_template("staff/add_stud.html",data=data)





# Update attendance data (including present and absent columns)
def update_attendance(slno, present, absent, current_date, in_classname):
    conn = sqlite3.connect('data_base.db')
    cursor = conn.cursor()

    # Fetch the current present and absent values from the database
    select_query = f"SELECT present, absent FROM {in_classname} WHERE slno = {slno}"
    cursor.execute(select_query)
    current_data = cursor.fetchone()

    if current_data:
        current_present, current_absent = current_data
        # Debugging: Print current values
        print(f"Current Data for SL.NO {slno}: Present = {current_present}, Absent = {current_absent}")

        # Add the new values to the current values
        new_present = current_present + present
        new_absent = current_absent + absent

        # Debugging: Print new values
        print(f"New Data for SL.NO {slno}: Present = {new_present}, Absent = {new_absent}")

        # Debugging: Print current_date to ensure it's correct
        print(f"Current Date for SL.NO {slno}: {current_date}")

        # Use parameterized query to avoid issues and ensure correct formatting
        query = '''UPDATE {0} SET present = ?, absent = ?, date = ? WHERE slno = ?'''.format(in_classname)
        cursor.execute(query, (new_present, new_absent, current_date, slno))
        conn.commit()
    else:
        print(f"No data found for SL.NO: {slno}")
    
    conn.close()


@app.route('/save_attendance', methods=['POST'])
def save_attendance():
    current_date = datetime.now().strftime('%d-%m-%Y')  # Format current date as 'YYYY-MM-DD'
    in_classname = request.form['classname']
    print(f"Form Data: {request.form}")  # Debugging: Print form data

    # Track which students have already been processed
    processed_students = set()

    # Iterate over each student and check attendance for periods P1 to P8
    for slno in request.form:
        if slno.startswith('p'):  # Only process keys representing periods (e.g., p1_1, p2_1)
            try:
                student_slno = slno.split('_')[1]  # Extract the student SL.NO
                student_slno = int(student_slno)  # Convert to integer

                # Skip if this student has already been processed
                if student_slno in processed_students:
                    continue

                # Initialize the present and absent counts
                present = 0
                absent = 0

                # Loop through each period (P1 to P8) and count attendance
                for period in range(1, 9):
                    # Check if the student attended this period (checkbox is checked)
                    if f'p{period}_{student_slno}' in request.form:
                        present += 1  # Period attended
                    else:
                        absent += 1  # Period absent

                # Debugging: Print the calculated attendance
                print(f"SL.NO {student_slno}: Present = {present}, Absent = {absent}")

                # Update the attendance in the database
                update_attendance(student_slno, present, absent, current_date, in_classname)

                # Mark this student as processed
                processed_students.add(student_slno)

            except IndexError:
                print(f"Error processing attendance for form field: {slno}")
                continue

    return "Attendance updated successfully!"


@app.route("/report_attendance/<string:classname>", methods=["POST", "GET"])
def report_attendance(classname):
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    query = f"SELECT * FROM {classname}"
    cur.execute(query)
    data = cur.fetchall()
    con.close()
    return render_template("admin/report1.html",data=data)


if(__name__ == '__main__'):
    app.run()




"""def get_db():
    conn = sqlite3.connect('data_base.db')
    return conn

# Update attendance data in the database
def update_attendance(slno, present, absent,current_date):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''UPDATE class1 SET present = ?, absent = ? ,date = ? WHERE slno = ?''', (present, absent, current_date,slno))
    conn.commit()
    conn.close()

@app.route('/save_attendance', methods=['POST'])
def save_attendance():
    current_date = datetime.now().strftime('%d-%m-%Y')
    # Iterate over each student and check attendance for periods P1 to P8
    for slno in request.form:
        if slno.startswith('p'):  # Only process keys representing periods (e.g., p1_1, p2_1)
            try:
                student_slno = slno.split('_')[1]  # Extract the student SL.NO
                student_slno = int(student_slno)  # Convert to integer

                # Initialize the present and absent counts
                present = 0
                absent = 0

                # Loop through each period (P1 to P8) and count attendance
                for period in range(1, 9):
                    # Check if the student attended this period (checkbox is checked)
                    if f'p{period}_{student_slno}' in request.form:
                        present += 1  # Period attended
                    else:
                        absent += 1  # Period absent

                # Update the attendance in the database (only present and absent columns)
                update_attendance(student_slno, present, absent,current_date)
            except IndexError:
                print(f"Error processing attendance for form field: {slno}")
                continue

    return "Attendance updated successfully!"

if(__name__ == '__main__'):
    app.run()"""
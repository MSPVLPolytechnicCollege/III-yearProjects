from flask import Flask,render_template,request
import sqlite3
import pandas as pd

app = Flask(__name__)



@app.route("/")
def home():
    return render_template("index.html")




@app.route("/signup")
def signup():
    return render_template('signup.html')




@app.route("/login")
def login():
    return render_template('login.html')






@app.route("/insert_users",methods=["POST","GET"])
def insert_users():
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
            cur.execute("INSERT INTO users(username,password) VALUES(?,?)", (in_username, in_password))
            con.commit()
            con.close()
            return render_template("login.html")
    else:
        return "password not match"





@app.route('/login_users',methods=["POST","GET"])
def login_users():
    user_name = request.form['user_name']
    password = request.form['password']
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from users where username=? and password=?",(user_name,password))
    data = cur.fetchall()
    if data:
        return render_template('index.html')
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
    return render_template("manage_classes.html", data=data)
    





@app.route("/create_class", methods=["POST", "GET"])
def create_class():
    try:
        in_classname = request.form['classname']
        in_classid = request.form['classid']
        in_classteacher = request.form['classteacher'] 
        con = sqlite3.connect('data_base.db')
        cur = con.cursor()
        query = f"CREATE TABLE {in_classname} (in_classname varchar(50), in_classid integer primary key, in_classteacher varchar(100))"
        cur.execute("INSERT INTO all_classes(classname,classid,classteacher) VALUES(?,?,?)",(in_classname,in_classid,in_classteacher))
        cur.execute(query)
        con.commit()
        con.close()
        return "inserted successfully"
    except:
        return "Class name or Id already exist"

 
@app.route('/add_stud')
def add_stud():
    return render_template('add_stud.html')
        
@app.route('/excel_to_table',methods=["POST", "GET"])
def excel_to_table():
    file = request.files['file']
    df = pd.read_excel(file)
    conn = sqlite3.connect("data_base.db")
    df.to_sql('attendance', conn, if_exists='append', index=False)
    conn.commit()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("Select * from attendance")
    data = cur.fetchall()

    return render_template("add_stud.html",data=data)
    
@app.route("/create_attendence_form")
def create_attendence_form():
    return render_template('create_attendance.html')


@app.route("/attendance_module")
def attendance_module():
    return render_template('attendance_module.html')

@app.route("/create_attendence",methods=["POST","GET"])
def create_attendence():
    in_name = request.form['name']
    in_section = request.form['section']
    in_id = request.form['id']
    con = sqlite3.connect("data_base.db")
    cur = con.cursor()
    query = "CREATE TABLE IF NOT EXISTS {}(rollno integer primary key,name varchar(50),all_periods integer,p1 integer,p2 integer,p3 integer,p4 integer,p5 integer,p6 integer,p7 integer,p8 integer,how_present int,how_absent int)".format(in_name)
    cur.execute(query)
    con.commit()
    cur.execute("insert into all_attendance(name,section,id)values(?,?,?)",(in_name,in_section,in_id))
    con.commit()
    con.close()
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from all_attendance")
    data = cur.fetchall()
    con.close()
    return render_template("all_attendance.html", data=data)



@app.route("/all_attendance")
def all_attendance():
    con = sqlite3.connect("data_base.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("Select * from all_attendance")
    data = cur.fetchall()
    con.close()
    return render_template("all_attendance.html", data=data)

@app.route("/view_attendance/<string:name>")
def view_attendance(name):
    return render_template('attendance_sheet.html',name=name)

@app.route("/add_student/<string:name>")
def add_student(name):
    return render_template('add_student_form.html',name=name)

@app.route("/insert_student",methods=["POST","GET"])
def insert_student():
    in_roll = request.form['roll_no']
    in_name = request.form['stud_name']
    in_att_name = request.form['attendance_name']
    con = sqlite3.connect("data_base.db")
    cur = con.cursor()
    cur.execute( "INSERT INTO nantha (rollno,name) VALUES(?,?)",(in_roll,in_name))
    con.commit()
    con.close()
    return "inserted"





if(__name__ == '__main__'):
    app.run()


















'''@app.route("/add_contact")
def add_contact():
    return render_template("add_contact.html")

@app.route("/insert_contact",methods=["POST","GET"])
def insert_contact():
    try:
        in_name = request.form['name']
        in_pno = request.form['pno']
        in_email = request.form['email']
        in_address = request.form['add']
        con = sqlite3.connect("db_contact_details.db")
        cur = con.cursor()
        cur.execute("INSERT INTO tb_contact_detail(name,pno,email,address) VALUES(?,?,?,?)", (in_name,in_pno,in_email,in_address))
        con.commit()
    except:
        return "<h1>The Contact Already Exist </h1>"
    finally:
        return render_template('added_success.html')
        con.close()

@app.route('/view_contacts')
def view_contacts():
    con = sqlite3.connect("db_contact_details.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
  cur.execute("Select * from tb_contact_detail")
    data = cur.fetchall()
    con.close()  
    return render_template("contacts.html",data=data)


@app.route('/update_contact/<string:id>',methods=["POST","GET"])
def update_contact(id):
    con = sqlite3.connect("db_contact_details.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("SELECT * FROM tb_contact_detail where pk=?",(id))
    data = cur.fetchone()
    con.commit()
    return render_template("update_contact.html",data=data)
    con.close()

@app.route('/update_contact_db',methods=["POST","GET"])
def update_contact_db():
    try:
        in_name = request.form['name']
        in_pno = request.form['pno']
        in_email = request.form['email']
        in_address = request.form['add']
        con = sqlite3.connect("db_contact_details.db")
        cur = con.cursor()
        cur.execute("UPDATE tb_contact_detail SET name=?,pno=?,email=?,address=? WHERE pno= ?" ,(in_name,in_pno,in_email,in_address,in_pno))
        con.commit()
    except:
        return "<h1> Updation Error</h1>"
    finally:
        return render_template('update_success.html')

@app.route('/delete_contact/<string:id>')
def delete_contact(id):
    con = sqlite3.connect("db_contact_details.db")
    cur = con.cursor()
    cur.execute("delete from tb_contact_detail where pk=?",(id))
    con.commit()
    return render_template('delete_success.html')
    con.close()
'''

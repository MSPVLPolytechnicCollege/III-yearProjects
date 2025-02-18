from flask import Flask,render_template,request
import sqlite3
import pandas as pd

app = Flask(__name__)


# home

@app.route("/")
def home():
    return render_template("login.html")



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


if(__name__ == '__main__'):
    app.run()
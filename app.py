
import sqlite3

from click import confirm
from flask import Flask,render_template,request,flash,redirect,url_for,session

app=Flask(__name__)

@app.route('/')
@app.route('/loginpage')
def home():
    return render_template('loginpage.html')

app.route('/confirm',methods=['GET','POST'])
def insert():
    if request.method=="POST":
            u=request.form.get('uname')
            p = request.form.get('password')
            con=sqlite3.connect('lakshmi1.db')
            cur=con.cursor()
            cur.execute("insert into ut1 (uname,password)values(?,?);",(u,p))
            con.commit()
            con.close()
            return render_template('confirm.html')
    return redirect (url_for('loginpage.html'))







if __name__ == "__main__":
    app.run(debug=True)

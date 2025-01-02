
from flask import Flask, render_template, request,redirect,url_for
import sqlite3
import cv2
con = sqlite3.connect('alumini__db.db')

app = Flask(__name__)


@app.route('/')
@app.route('/login')
def home():
    return render_template('login-stu.html')


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
        return render_template('success.html', message="Data inserted successfully.")
    return redirect(url_for('login-stu.html'))

@app.route('/forgot/<string:username>', methods=["GET", "POST"])
def updateData(username):
    if request.method == 'POST':
        forgot_s_user = request.form['forgot-stu-name']
        forgot_s_pass = request.form['forgot-stu-pass']
        con = sqlite3.connect('alumini__db.db')
        cursor = con.cursor()
        cursor.execute("update stu_login set password=? where username=?",(forgot_s_pass,forgot_s_user))
        con.commit()  # commit will give it will execute on the db
        con.close()
        return redirect(url_for('login-stu.html'))
    return render_template('update-stu.html',username=username)


if __name__=='__main__':
    app.run(debug=True)

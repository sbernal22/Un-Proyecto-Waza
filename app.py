from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector

app=Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="charliemons"
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup():
    data=request.json
    hashed_password=generate_password_hash(data['password'])

    cursor=db.cursor()
    sql="INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)"
    cursor.execute(sql, (data['username'], data['email'], hashed_password))
    db.commit()
    res=cursor.fetchall()
    return jsonify({"message": "User created"})

@app.route('/login', methods=['POST'])
def login():
    data=request.json
    cursor=db.cursor(dictionary=True)
    sql="SELECT * FROM users WHERE username = %s"
    cursor.execute(sql, (data['username'],))
    user=cursor.fetchone()
    if user and check_password_hash(user['password_hash'], data['password']):
        return jsonify({"message": "Success", "user_id": user['id'], "username": user["username"]})
    else:
        return jsonify({"error": "Wrong ..."}), 401

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import spacy
from flask_mail import Mail, Message
import random
import string
from datetime import datetime, timedelta
from fuzzywuzzy import fuzz  # For fuzzy text matching

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# MongoDB setup
client = MongoClient("mongodb+srv://JA_Blackcap:MSN91011ja@ja24.a5chk.mongodb.net/?retryWrites=true&w=majority&appName=JA24")
db = client['Pybot']
users_collection = db['User_details']
qa_collection = db['QN_AN']  # The Q&A collection
otp_collection = db["OTP_Collection"]

# Flask-Mail Configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USE_SSL"] = False
app.config["MAIL_USERNAME"] = "jo24alive@gmail.com"
app.config["MAIL_PASSWORD"] = "kdob lghy kghj cewi"

mail = Mail(app)

# Function to generate OTP
def generate_otp():
    return str(random.randint(100000, 999999))  # Generate a 6-digit OTP

# Function to preprocess text (lemmatization)
def preprocess_text(text):
    doc = nlp(text.lower())
    return " ".join([token.lemma_ for token in doc])

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    age = data.get('age')
    email = data.get('email')

    if not username or not password or not age or not email:
        return jsonify({'message': 'Missing required fields'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'Username already exists'}), 409

    if users_collection.find_one({'email': email}):
        return jsonify({'message': 'Email already exists'}), 409

    hashed_password = generate_password_hash(password)

    user_data = {
        'username': username,
        'password': hashed_password,
        'age': int(age),
        'email': email
    }

    users_collection.insert_one(user_data)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    user = users_collection.find_one({'username': username})

    if user and check_password_hash(user['password'], password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route("/api/forgotpassword", methods=["POST"])
def forgot_password():
    data = request.json
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return jsonify({"message": "Username and email are required."}), 400

    user = users_collection.find_one({
        "username": {"$regex": f"^{username}$", "$options": "i"},
        "email": {"$regex": f"^{email}$", "$options": "i"}
    })

    if not user:
        return jsonify({"message": "Invalid username or email."}), 400

    otp = generate_otp()
    expiry_time = datetime.utcnow() + timedelta(minutes=10)

    otp_collection.update_one(
        {"email": email},
        {"$set": {"otp": otp, "expires_at": expiry_time}},
        upsert=True
    )

    msg = Message("Password Reset OTP", sender="your-email@gmail.com", recipients=[email])
    msg.body = f"Your OTP is {otp}. It expires in 10 minutes."

    try:
        mail.send(msg)
        return jsonify({"message": "OTP sent to your email."}), 200
    except Exception as e:
        return jsonify({"message": "Failed to send OTP email. Try again."}), 500

@app.route("/api/verifyotp", methods=["POST"])
def verify_otp():
    data = request.json
    otp_entered = data.get("otp", "").strip()

    if not otp_entered:
        return jsonify({"message": "OTP is required."}), 400

    record = otp_collection.find_one({"otp": otp_entered})

    if record:
        if datetime.utcnow() < record.get("expires_at", datetime.utcnow()):
            return jsonify({"message": "OTP verified. Proceed to reset password."}), 200
        else:
            return jsonify({"message": "OTP expired. Request a new one."}), 400
    return jsonify({"message": "Invalid OTP."}), 400

@app.route("/api/resetpassword", methods=["POST"])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("newPassword")

    if not email or not new_password:
        return jsonify({"message": "Email and new password are required."}), 400

    hashed_password = generate_password_hash(new_password)
    users_collection.update_one({"email": email}, {"$set": {"password": hashed_password}})

    return jsonify({"message": "Password reset successful."}), 200

@app.route('/api/add_qa', methods=['POST'])
def add_qa():
    data = request.get_json()
    question = data.get("question", "").strip()
    answer = data.get("answer", "").strip()

    if not question or not answer:
        return jsonify({"message": "Both question and answer are required"}), 400

    processed_question = preprocess_text(question)

    if qa_collection.find_one({"processed_question": processed_question}):
        return jsonify({"message": "Question already exists"}), 409

    qa_collection.insert_one({"question": question, "processed_question": processed_question, "answer": answer})
    return jsonify({"message": "Q&A added successfully"}), 201

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('query', "").strip()

    if not user_message:
        return jsonify({'message': 'No message received'}), 400

    processed_text = preprocess_text(user_message)

    qa_entry = qa_collection.find_one({"processed_question": processed_text})
    if qa_entry:
        return jsonify({'response': qa_entry['answer']}), 200

    best_match = None
    best_score = 0

    for qa in qa_collection.find():
        score = fuzz.ratio(processed_text, qa["processed_question"])
        if score > best_score:
            best_score = score
            best_match = qa

    if best_match and best_score >= 80:
        return jsonify({'response': best_match['answer']}), 200

    return jsonify({'response': "Sorry, I didn't understand that. Can you rephrase?"}), 200

if __name__ == '__main__':
    app.run(debug=True)

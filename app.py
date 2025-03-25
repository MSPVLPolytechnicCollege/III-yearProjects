from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import spacy

app = Flask(__name__)
CORS(app)

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# MongoDB setup
client = MongoClient("mongodb+srv://JA_Blackcap:MSN91011ja@ja24.a5chk.mongodb.net/?retryWrites=true&w=majority&appName=JA24")
db = client['Pybot']
users_collection = db['User_details']
qa_collection = db['QN_AN']  # The Q&A collection

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

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('query')

    if not user_message:
        return jsonify({'message': 'No message received'}), 400

    # Use spaCy for NLP processing
    doc = nlp(user_message.lower())
    processed_text = " ".join([token.lemma_ for token in doc])  # Lemmatization

    # Search for the processed question in the database
    qa_entry = qa_collection.find_one({'question': {'$regex': processed_text, '$options': 'i'}})

    if qa_entry:
        return jsonify({'response': qa_entry['answer']}), 200
    else:
        return jsonify({'response': "Sorry, I didn't understand that. Can you rephrase?"}), 200

@app.route('/api/chatbotlog', methods=['POST'])
def chatbotlog():
    data = request.get_json()
    user_message = data.get('query')

    if not user_message:
        return jsonify({'message': 'No message received'}), 400

    # Use spaCy for NLP processing
    doc = nlp(user_message.lower())
    processed_text = " ".join([token.lemma_ for token in doc])  # Lemmatization

    # Search for the processed question in the database
    qa_entry = qa_collection.find_one({'question': {'$regex': processed_text, '$options': 'i'}})

    if qa_entry:
        return jsonify({'response': qa_entry['answer']}), 200
    else:
        return jsonify({'response': "Sorry, I cann't understand that. Can you rephrase?"}), 200


if __name__ == '__main__':
    app.run(debug=True)

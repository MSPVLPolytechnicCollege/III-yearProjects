const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    app.post('/register', (req, res) => {
      const { username, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);
      usersCollection.insertOne({ username, password: hashedPassword }, (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Error registering user' });
        } else {
          res.send({ message: 'User registered successfully' });
        }
      });
    });

    app.post('/login', (req, res) => {
      const { username, password } = req.body;
      usersCollection.findOne({ username }, (err, user) => {
        if (err || !user) {
          res.status(401).send({ message: 'Invalid username or password' });
        } else {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (!isValidPassword) {
            res.status(401).send({ message: 'Invalid username or password' });
          } else {
            const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
            res.send({ token });
          }
        }
      });
    });
  }
});

app.listen(3001
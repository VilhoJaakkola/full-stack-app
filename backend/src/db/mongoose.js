const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL || "mongodb://backenduser:backenderittainturvallinen@localhost:27017/backendDatabase";

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection URL - replace with your own
const dbUrl = 'mongodb://localhost:27017/preventai';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected successfully to MongoDB");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from PreventAI Backend OLEEEEE!' });
  });
  
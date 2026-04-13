"use strict";

const express = require('express');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

//part B7 variables
let messages = [
        { id: 1, text: "Welcome to the message board!", author: "Admin" },
    ];
let nextId = 2; 

// ---- Your endpoints go below this line ----
app.get('/hello', (req, res) => {
    res.type('text').send('Hello from the server!');
});

app.get('/api/time', (req, res) => {
    const data = {

        "currentTime": new Date().toISOString(),
        "message": "Curent server time"
    }
    res.type('json').send(data);
});

app.get('/api/greet/:name', (req, res) => {
    const name = req.params.name;
    const data = {
        "greeting": "Hello, " + name + "! Welcome to the API."
    }
    res.type('json').send(data);
});

app.get('/api/math/', (req, res) => {
    let a = parseInt(req.query.a, 10);
    let b =  parseInt(req.query.b, 10) ;
    let op = req.query.operation; 
    let result;
    if (op === 'add') {
        result = a + b;
    } else if (op === 'subtract') {
        result = a - b;
    } else if (op === 'multiply') {
        result = a * b;
    } else if (op === 'divide') {
        if(a ===0 ){
            res.status(400).json({ error: 'Cannot divide by zero' });
        }else{
            result =  a / b;
        }
        
    } else {
        res.status(400).json({ error: 'Invalid or missing operation. Use: add, subtract, multiply, divide' });
    }
    const data = {
        "a": a,
        "b": b,
        "operation": op,
        "result": result
    }
    res.type('json').send(data);
});

// ---- Your endpoints go above this line ----

app.get('/api/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      message: "Sorry for the wait!",
      delayMs: 3000
    });
  }, 3000);
});

app.get('/api/unreliable', (req, res) => {
  const rand = Math.random();
  if (rand < 0.5) {
    res.status(500).json({
      error: "Server had a bad day. Try again!"
    });
  } else {
    res.json({
      message: "Lucky! It worked this time.",
      luckyNumber: Math.floor(Math.random() * 100)
    });
  }
});

app.get('/api/messages', (req,res) =>{
    const data = {
        "messages": messages,
    }
    res.type('json').send(data);
    
});

app.post('/api/messages', (req, res) => {
    const { text, author } = req.body;
    // Validate that both fields are present
    if (!text || !author) {
        return res.status(400).json({ error: 'Both "text" and "author" are required.' });
    }
    // Create the new message object
    const data = {
        id: nextId,
        text: text,
        author: author
    };
    // Add it to our in-memory array
    messages.push(data);
    // Respond with 201 Created and the new message
    res.status(201).json(data);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

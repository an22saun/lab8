"use strict";

const express = require('express');
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse JSON request bodies (needed for POST)
app.use(express.json());

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// index.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let messages = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/webhook', (req, res) => {
    messages.push(req.body);
    console.log(`Message received: ${req.body}`);
    res.status(200).send('Message received');
});


// app.post('/webhook', (req, res) => {
//     const { sender, date, body } = req.body;
//     if (sender && date && body) {
//         messages.push({ sender, date, body });
//         console.log(`Message received from ${sender} on ${date}: ${body}`);
//         res.status(200).send('Message received');
//     } else {
//         res.status(400).send('Invalid message format');
//     }
// });

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

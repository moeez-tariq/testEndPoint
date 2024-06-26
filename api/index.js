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
    const { contacts, messages } = req.body;

    const contact = contacts[0];
    const message = messages[0];

    const name = contact.profile.name;
    const wa_id = contact.wa_id;
    const timestamp = message.timestamp;
    const body = message.text.body;

    messages.push({ name, wa_id, timestamp, body });
    res.status(200).send('Message received successfully');
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

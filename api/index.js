// index.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sdk = require('@api/cequens-api');
require('dotenv').config();


const app = express();
const port = 3000;

let messageList = [];

const authToken = process.env.AUTH_TOKEN;
sdk.auth(authToken);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/webhook', (req, res) => {
    try{
        const { contacts, messages } = req.body;

        const contact = contacts[0];
        const message = messages[0];
        const name = contact.profile.name;
        let wa_id = contact.wa_id;
        const timestamp = message.timestamp;
        const body = message.text.body;
        wa_id = '+' + wa_id;
        messageList.push({ "name":name, "wa_id":wa_id, "timestamp":timestamp, "body":body });

        sdk.sendingTemplateMessage({
            recipient_type: 'individual',
            type: 'template',
            template: {
                language: { policy: 'deterministic', code: 'en' },
                namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
                components: [{ type: 'body', parameters: [] }],
                name: 'test_template_101'
            },
            to: wa_id,
        })
        .then(({ data }) => {
            console.log(`Template message sent successfully to ${name} (${wa_id})`);
            console.log(data);
        })
        .catch(err => {
            console.error(`Failed to send template message to ${name} (${wa_id})`);
            console.error(err);
        });

        res.status(200).send('Message received successfully');
    }
    catch(err){
        console.log(err);
        res.status(400).send('Invalid message format');
    }
    
    
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
    res.json(messageList);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

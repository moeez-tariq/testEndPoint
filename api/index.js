// index.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const sdk = require('@api/cequens-api');
const request = require('request');
require('dotenv').config();


const app = express();
const port = 3000;

let messageList = [];

// const authToken = process.env.AUTH_TOKEN;
// sdk.auth(authToken);


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

        const options = {
            method: 'POST',
            url: 'https://apis.cequens.com/conversation/wab/v1/messages/',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`
            },
            body: {
                recipient_type: 'individual',
                type: 'template',
                template: {
                    language: { policy: 'deterministic', code: 'en' },
                    namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
                    components: [
                        {
                            "type": "HEADER",
                            "paramters": [
                                {"type": "image", 
                                    "image": {"link": "https://scontent.whatsapp.net/v/t61.29466-34/431153528_750083723772534_5351568329922462307_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=s4C1FFuootkQ7kNvgE67Wer&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIKayvWiveBkBqNdqb53_dm0vBhVpSOHjXuGeBwQX_24k&oe=66A35EFB" }}
                            ],
                            // "format": "IMAGE",
                            // "example": {
                            // "header_handle": [
                            //     "https://scontent.whatsapp.net/v/t61.29466-34/431153528_750083723772534_5351568329922462307_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=s4C1FFuootkQ7kNvgE67Wer&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&oh=01_Q5AaIKayvWiveBkBqNdqb53_dm0vBhVpSOHjXuGeBwQX_24k&oe=66A35EFB"
                            // ]
                            // }
                        },
                        {
                            "type": "BODY",
                            "parameters": []
                        }
                    ],
                    name: 'test_template_101'
                },
                to: wa_id
            },
            json: true
        };

        // Send request to Cequens API
        request(options, function (error, response, body) {
            if (error) {
                console.error('Error sending template message:', error);
                res.status(500).send('Failed to send template message');
            } else {
                console.log('Template message sent successfully:', body);
                res.status(200).send('Message received and template message sent');
            }
        });

        // sdk.sendingTemplateMessage({
        //     recipient_type: 'individual',
        //     type: 'template',
        //     template: {
        //         language: { policy: 'deterministic', code: 'en' },
        //         namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
        //         components: [{ type: 'body', parameters: [] }],
        //         name: 'test_template_101'
        //     },
        //     to: wa_id,
        // })
        // .then(({ data }) => {
        //     console.log(`Template message sent successfully to ${name} (${wa_id})`);
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.error(`Failed to send template message to ${name} (${wa_id})`);
        //     console.error(err);
        // });

        // res.status(200).send('Message received successfully');
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

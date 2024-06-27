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

function handlePendingMessages(receivedNumber) {
    console.log('Handling pending messages for number:', receivedNumber);
}

// app.post('/webhook', (req, res) => {
//     try{
//         const { contacts, messages } = req.body;

//         const contact = contacts[0];
//         const message = messages[0];
//         const name = contact.profile.name;
//         let wa_id = contact.wa_id;
//         const timestamp = message.timestamp;
//         const body = message.text.body;
//         wa_id = '+' + wa_id;
//         messageList.push({ "name":name, "wa_id":wa_id, "timestamp":timestamp, "body":body });

//         const options = {
//             method: 'POST',
//             url: 'https://apis.cequens.com/conversation/wab/v1/messages/',
//             headers: {
//                 accept: 'application/json',
//                 'content-type': 'application/json',
//                 Authorization: `Bearer ${process.env.AUTH_TOKEN}`
//             },
//             body: {
//                 recipient_type: 'individual',
//                 type: 'template',
//                 template: {
//                     language: { policy: 'deterministic', code: 'en' },
//                     namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
//                     components: [{ type: 'body', parameters: [] }],
//                     name: 'test_template_101'
//                 },
//                 to: wa_id
//             },
//             json: true
//         };

//         // Send request to Cequens API
//         request(options, function (error, response, body) {
//             if (error) {
//                 console.error('Error sending template message:', error);
//                 res.status(500).send('Failed to send template message');
//             } else {
//                 console.log('Template message sent successfully:', body);
//                 res.status(200).send('Message received and template message sent');
//             }
//         });

//         // sdk.sendingTemplateMessage({
//         //     recipient_type: 'individual',
//         //     type: 'template',
//         //     template: {
//         //         language: { policy: 'deterministic', code: 'en' },
//         //         namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
//         //         components: [{ type: 'body', parameters: [] }],
//         //         name: 'test_template_101'
//         //     },
//         //     to: wa_id,
//         // })
//         // .then(({ data }) => {
//         //     console.log(`Template message sent successfully to ${name} (${wa_id})`);
//         //     console.log(data);
//         // })
//         // .catch(err => {
//         //     console.error(`Failed to send template message to ${name} (${wa_id})`);
//         //     console.error(err);
//         // });

//         // res.status(200).send('Message received successfully');
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).send('Invalid message format');
//     }
    
    
// });


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

// app.post('/webhook', (req, res) => {
//     console.log(req.body);
//     messageList.push(req.body);
//     res.status(200).send('Message received');
// });



app.post('/webhook', (req, res) => {
    // Log the entire request body
    console.log('Received message:');
    console.log(req.body);

    // Assuming req.body is an object, iterate over its keys to display each element
    console.log('Extracted elements:');
    for (let key in req.body) {
        console.log(`${key}: ${req.body[key]}`);
    }

    let numberReceived = req.body.Number;
    let statusReceived = req.body.Status;

    // Assuming numberReceived is a number, convert it to a string
    numberReceived = numberReceived.toString();
    numberReceived = '+' + numberReceived;
    const finalNumber = numberReceived;

    // if (statusReceived === 'Pending') {
    //     handlePendingMessages(finalNumber);
    //     const options = {
    //         method: 'POST',
    //         url: 'https://apis.cequens.com/conversation/wab/v1/messages/',
    //         headers: {
    //             accept: 'application/json',
    //             'content-type': 'application/json',
    //             Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    //         },
    //         body: {
    //             recipient_type: 'individual',
    //             type: 'template',
    //             template: {
    //                 language: { policy: 'deterministic', code: 'en' },
    //                 namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
    //                 components: [{ type: 'body', parameters: [] }],
    //                 name: 'test_template_101'
    //             },
    //             to: finalNumber
    //         },
    //         json: true
    //     };
    
    //     // Send request to Cequens API
    //     request(options, function (error, response, body) {
    //         if (error) {
    //             console.error('Error sending template message:', error);
    //             res.status(500).send('Failed to send template message');
    //         } else {
    //             console.log('Template message sent successfully:', body);
    //             res.status(200).send('Message received and template message sent');
    //         }
    //     });
    // } else if (statusReceived === 'Complete') {
    //     console.log(`Message from ${finalNumber} is complete`);
    // }
    // Assuming messageList is defined elsewhere in your application to store messages
    messageList.push(req.body);

    // Send a response back to the requester
    res.status(200).send('Message received');
});


app.get('/messages', (req, res) => {
    res.json(messageList);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

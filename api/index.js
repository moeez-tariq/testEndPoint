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

function handleStatusUpdate(finalNumber, templateName) {
    const options = {
        method: 'POST',
        url: 'https://apis.cequens.com/conversation/wab/v1/messages/',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImZiY2NjNDM1Y2E1NjYzOGNjYmVkM2U5MjhhNWRiMDM1MzA2NzY0OTdlOTgzODEyNWQxZTc1MTMyODBiMzQ0YTgwOGI2YjYwMzZiZWQ2OGYzYjNlM2MxZTk3MGFiYmY0NDYwYzQyMTllZmM2MDA1ZTFkZTM2NWMwYjU4YTVhNDVjY2Y1OGM5Nzc2YTBlMmQ3YzMwZGUzNzgzMTQwNWY0ZDc0YjU2ODgwMmRmZmU4ZjQ1MjEwMDk3MTZiZmMzMmE3N2YxNjAxNGM4YzIzMzkwOGNjZWQyODJkY2E3YzgxNGE5NTU5NDk3NmVlMjc4NTRlZTg5MGY4YmJmZGQ4YTVkMjFhY2UyN2YzMzgzNDJjYzc2ZjUwYjY5OGM4MmFiZmNlMTRmNzY3ZDhjYTZkNmFkNWYwMDU2ODA2Y2VlM2FmNzk3MjFiZWEwZmQ3MGJjOTkyMjZlNWIyZDE5YTcxMjg5YzIwMmI0MzJlMDFiNTM3NzI0NDc2N2VmMmM3MmM0YWQyMGQ3ZTJkOTEzYjUxOTU0ZWExMDU4YmVjZDQyYTJhY2Y1OTBmYjZkZjBiMDE4ZDA5ZjljYTY1MmExYzlmYTI1YThkOTgxYmE1YTQ0ZDRmYTc3ZmJiMDBiMGQ4NGQ5Y2ViMGRjN2U3NDYyOGMwODMyNTg0ZGI4YzY5M2NlYjEwYWRjY2Q0YTJkMjBjNGY3MTc4ZTFkMzc3ZTI3NDY0ZTc2ZjI0N2FmOWU0OGE5NjNjNTI3MGZlMGNkNjlhMTkxNTY2YTg4MTI2MTViY2RiYzY2YjRmZDkxMjdhNjk0NTcwY2U5YjJmNWI3NmQ2MGNiNTAxNDgxYTA1YTNhYTRiYzBlMmQzZWFhYjc0YWM4ZTcxOGI5OTBmODdlMzNiZGNlNjg1NiIsImlhdCI6MTY5NDYxMDk4OCwiZXhwIjozMjcyNDkwOTg4fQ.PG6n-Yw6B2QneaQd4zBz5O62F7uw5JlSiZwuRb3JpkM'
        },
        body: {
            recipient_type: 'individual',
            type: 'template',
            template: {
            language: {policy: 'deterministic', code: 'en'},
            namespace: '841f4fb9_7e40_4764_b06a_6c323ebba684',
            name: templateName,
            components: [
                // {
                // type: 'header',
                // parameters: [
                //     {
                //     type: 'image',
                //     image: {link: 'https://qlub.io/wp-content/uploads/2022/09/step-2-5.png'}
                //     }
                // ]
                // },
                {type: 'body', parameters: []}
            ]
            },
            to: finalNumber
        },
        json: true
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });
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
    if (req.body.Type === 'Update') {
        let numberReceived = req.body.Number;
        let statusReceived = req.body.Status;

        // Assuming numberReceived is a number, convert it to a string
        numberReceived = numberReceived.toString();
        numberReceived = '+' + numberReceived;
        const finalNumber = numberReceived;
        let templateName;
        if (statusReceived === 'Approved') {
            templateName = 'test_template_101';
            handleStatusUpdate(finalNumber, templateName);
        } else if (statusReceived === 'Complete') {
            templateName = 'test_template_101';
            handleStatusUpdate(finalNumber, templateName);
            // console.log(`Message from ${finalNumber} is complete`);
        }
        // Assuming messageList is defined elsewhere in your application to store messages
        messageList.push(req.body);

        // Send a response back to the requester
        res.status(200).send('Message received');
    }
    else if (req.body.Type === 'Submit') { 
        let numberReceived = req.body.Number;
        templateName = 'test_template_101';
        handleStatusUpdate(finalNumber, templateName);
        console.log("Number Received: ", numberReceived);
        messageList.push(req.body);

        // Send a response back to the requester
        res.status(200).send('Message received');
    }
});


app.get('/messages', (req, res) => {
    res.json(messageList);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

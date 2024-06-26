// public/app.js

// async function fetchMessages() {
//     const response = await fetch('/messages');
//     const messages = await response.json();
//     const messagesDiv = document.getElementById('messages');
//     messagesDiv.innerHTML = '';
//     messages.forEach(msg => {
//         const messageDiv = document.createElement('div');
//         messageDiv.className = 'message';
//         messageDiv.innerHTML = `<strong>Sender:</strong> ${msg}<br>
//         `;
//         // messageDiv.innerHTML = `
//         //     <strong>Sender:</strong> ${msg.sender}<br>
//         //     <strong>Date:</strong> ${msg.date}<br>
//         //     <strong>Message:</strong> ${msg.body}
//         // `;
//         messagesDiv.appendChild(messageDiv);
//     });
// }

async function fetchMessages() {
    const response = await fetch('/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <strong>Name:</strong> ${msg.name}<br>
            <strong>Wa_id:</strong> ${msg.wa_id}<br>
            <strong>Timestamp:</strong> ${msg.timestamp}<br>
            <strong>Body:</strong> ${msg.body}<br><br>
        `;
        messagesDiv.appendChild(messageDiv);
    });
}

// Call fetchMessages to load messages initially
fetchMessages();

// Optional: Set interval to periodically fetch messages
setInterval(fetchMessages, 5000);  // Fetch messages every 5 seconds (5000 milliseconds)


// setInterval(fetchMessages, 5000);
// fetchMessages();

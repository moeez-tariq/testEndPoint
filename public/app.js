// public/app.js

async function fetchMessages() {
    const response = await fetch('/');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <strong>Sender:</strong> ${msg.sender}<br>
            <strong>Date:</strong> ${msg.date}<br>
            <strong>Message:</strong> ${msg.body}
        `;
        messagesDiv.appendChild(messageDiv);
    });
}

setInterval(fetchMessages, 5000);
fetchMessages();

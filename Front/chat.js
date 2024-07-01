document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');

    //const socket = io("http://127.0.0.1:5000");

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const message = chatInput.value.trim();
        
        if (message !== '') {
            addMessage('You', message);
            sendMessageToAPI(message);
            chatInput.value = '';
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });

    function sendMessageToAPI(message) {
        fetch('http://127.0.0.1:5000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                addMessage('Server', data.response);
            } else {
                data.forEach(promocion => {
                    addMessage('Promoción', `Producto ID: ${promocion.id_producto}, Unidades de Regalo: ${promocion.unidades_regalo}`);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});

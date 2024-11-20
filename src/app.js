import './style.css';
import axios from 'axios';

// Initialize chat functionality
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const clearChatBtn = document.getElementById('clear-chat');

// Function to send message to server
async function sendMessage(message) {
    try {
        const response = await axios.post('http://localhost:3000/api/chat', {
            messages: [
                { role: 'user', content: message }
            ]
        });
        
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    
    if (message) {
        // Clear input
        messageInput.value = '';
        
        // Display user message
        appendMessage('user', message);
        
        try {
            // Get AI response
            const response = await sendMessage(message);
            const aiMessage = response.choices[0].message.content;
            
            // Display AI response
            appendMessage('assistant', aiMessage);
        } catch (error) {
            console.error('Error:', error);
            appendMessage('system', 'Sorry, there was an error processing your message.');
        }
    }
});

// Function to append message to chat
function appendMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role + '-message');
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clear chat window
clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
});
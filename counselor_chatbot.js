// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    let timerInterval;
    let timeLeft = 60; // 1 minute countdown for each query
    let isWaiting = false; // To track if waiting for the next query

    // Enable input for the first message (you can do this on page load)
    enableInput();

    // Send message function
    // Send message function
function sendMessage() {
    if (isWaiting || document.getElementById('user-input').disabled) return; // Prevent sending if still waiting

    const userInput = document.getElementById('user-input').value;
    const infoType = document.getElementById('info-type').value; // Get selected info type

    if (userInput.trim() === '') return;

    // Combine the info type and user input message
    const combinedMessage = `[${infoType.toUpperCase()}] ${userInput}`;

    addMessage('user-message', combinedMessage, '{% static "images/icons/user-chat-bot.svg" %}');
    document.getElementById('user-input').value = '';

    // Send the message to the server
    fetch('/chatbot-response/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Add CSRF token for security
        },
        body: JSON.stringify({ message: combinedMessage }) // Send the combined message
    })
    .then(response => response.json())
    .then(data => {
        addMessage('bot-message', data.response, '{% static "images/icons/chat-bot-msg.svg" %}');
    });

    // Start the countdown after sending the message
    startCountdown();
}

    // Start countdown after sending the message
    function startCountdown() {
        isWaiting = true; // Mark as waiting for the next input
        timeLeft = 60; // Reset time for the next query

        document.getElementById('user-input').disabled = true;
        document.getElementById('send-message').disabled = true;

        timerInterval = setInterval(function() {
            timeLeft--;
            updatePlaceholder(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Stop the countdown
                enableInput(); // Re-enable input
            }
        }, 1000); // Update every second
    }

    // Update the placeholder text with countdown or ready message
    function updatePlaceholder(seconds) {
        if (seconds > 0) {
            document.getElementById('user-input').placeholder = `your next query in ${seconds} sec`;
        } else {
            document.getElementById('user-input').placeholder = "InfoMate is ready to answer your question";
        }
    }

    // Function to re-enable the input after countdown
    function enableInput() {
        isWaiting = false; // Reset waiting status
        document.getElementById('user-input').disabled = false;
        document.getElementById('send-message').disabled = false;
        document.getElementById('user-input').placeholder = "InfoMate is ready to answer your question"; // Ready to ask
    }

    // Add message to the chat
    function addMessage(className, text, icon) {
        const messages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;

        // Create the message content with icon
        const messageContent = `
            <img src="${icon}" alt="avatar" class="avatar">
            <div class="message-text">${text}</div>
        `;

        messageElement.innerHTML = messageContent;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    // Function to get the CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Add keypress listener for Enter
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !isWaiting) {
            sendMessage();
        }
    });

    // Add click listener for the Send button
    document.getElementById('send-message').onclick = function() {
        sendMessage();
    };
});
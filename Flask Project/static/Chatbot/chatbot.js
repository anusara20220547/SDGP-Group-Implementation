const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

//Function to get user messages
function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    appendMessage('💬 ', userMessage, 'user-message');
    userInput.value = '';

    // Simulate bot response (replace with your actual AI logic)
    setTimeout(() => {
        const botResponse = generateBotResponse(userMessage);
        appendMessage('🤖  ', botResponse, 'bot-message');
    }, 500);
}

// Send message on Enter key press
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function appendMessage(sender, message, messageClass) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(messageClass); // Add user-message or bot-message class

    messageElement.innerHTML = `<div class="${messageClass}"><strong>${sender}</strong>: ${message}</div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase().trim();

    // Define bot responses based on user input
    switch (true) {
        case userMessage.includes("hello"):
        case userMessage.includes("hi"):
        case userMessage.includes("hey"):
            return "Hello! How can I assist you?";
        case userMessage.includes("how are you"):
            return "I'm just a bot, but thanks for asking!";
        case userMessage.includes("what is voice of unity and what does it offer?"):
            return  "Voice of Unity is a pioneering online petition platform dedicated to fostering unity and driving positive change within the Sri Lankan community. Here's what you need to know about our platform:<br><br>" +
            "1. Multi-Language Support: We understand the diverse linguistic landscape of Sri Lanka, which is why Voice of Unity supports multiple languages, ensuring accessibility for all.<br><br>" +
            "2. Smart Chatbot: Our intelligent chatbot is here to assist you every step of the way. Whether you're searching for petitions, signing up, or creating a petition, our chatbot makes the process seamless and intuitive.<br><br>" +
            "3. Petition Management: Voice of Unity empowers users to create petitions on a wide range of issues, from social justice to environmental conservation. You can draft petitions, collect signatures, and track the progress of your campaigns with ease.<br><br>" +
            "4. Facial Recognition Authentication: We prioritize security and integrity. That's why we implement facial recognition authentication during registration and sign-in, ensuring your identity remains protected.<br><br>" +
            "5. Community Engagement: Join a vibrant community of like-minded individuals who are passionate about making a difference. Voice of Unity facilitates discussions, shares updates, and promotes collaboration among users.<br><br>" +
            "6. Transparent and Accountable: We believe in transparency and accountability. You can monitor the status of petitions, track signature counts, and receive updates on campaign outcomes, empowering you to stay informed every step of the way.<br><br>" +
            "Voice of Unity is more than just a platform—it's a movement for positive change. Join us today and be a part of the voice for unity!";

            
        case userMessage.includes("2 . how can i sign a petition?"):
            return `To sign a petition, please follow these steps:<br><br>
                    1. Login or Register: First, ensure you are logged into the system. If you're not registered yet, you'll need to sign up and provide necessary details, including a facial image for identification purposes.<br><br>
                    2. Navigate to User Home Page: After logging in, you'll be directed to your user home page. Here, you'll find various options and features. Look for the 'Sign Petition' button and click on it.<br><br>
                    3. Sign Petition Page: Upon clicking the 'Sign Petition' button, you'll be taken to a page displaying all available petitions. Each petition box contains a 'Sign' button. Click on the 'Sign' button corresponding to the petition you wish to support.<br><br>
                    By following these steps, you can sign petitions and contribute to causes you care about.`;
            
        case userMessage.includes("create a petition?"):
            return "To create for a petition, please follow these steps: [Details...]";

        case userMessage.includes("search a petition"):
            return `To search for a petition, please follow these steps:<br><br>
                    1. Login or Register: First, ensure you are logged into the system. If you're not registered yet, you'll need to sign up and provide necessary details, including a facial image for identification purposes.<br><br>
                    2. Navigate to User Home Page: After logging in, you'll be directed to your user home page. Here, you'll find various options and features. In there, you'll see a search panel. Add your search petition's main topic and click on the search button.<br><br>
                    3. Upon clicking the 'Search' button, you'll be taken to a page displaying all search results. By following these steps, you can find petitions related to your interests and contribute to causes you care about.`;
            
        case userMessage.includes("register"):
            return `To register, please follow these steps:<br><br>
                    1. Access Registration Form: If you're not registered yet, you'll need to sign up. Look for the 'Register' or 'Sign Up' option on the login page or homepage and click on it.<br><br>
                    2. Fill out Registration Form: You'll be directed to a registration form where you'll need to provide necessary details such as your name, email address, password, and any other required information.<br><br>
                    3. Add Facial Registration Details: After submitting the registration form, you'll be navigated to a page where you need to capture a picture using your system's camera for facial recognition purposes.<br><br>
                    4. Confirmation: Once your registration is successful, you'll receive a confirmation message and be logged into the system automatically.`;
                    
        case userMessage.includes("sign in"):
            return `To sign in, please follow these steps:<br><br>
                    1. Access Login Page: If you're already registered, navigate to the login page by clicking on the 'Sign In' or 'Login' option.<br><br>
                    2. Enter Credentials: On the login page, enter your registered email address and password.<br><br>
                    3. Add Facial Recognition: After entering your credentials, you'll be prompted to use facial recognition for additional security. Follow the instructions to capture a picture using your system's camera.<br><br>
                    4. Sign In: After successfully completing the facial recognition, click on the 'Sign In' or 'Login' button to access your account.<br><br>
                    5. Access User Home Page: Upon successful login, you'll be directed to your user home page where you can access various features and options available within the system.`;
                    
        case userMessage.includes("thank you"):
            return "You're welcome!";
        case userMessage.includes("can i participate in multiple petitions?"):
            return "Yes, you can participate in multiple petitions on Voice of Unity. There is no limit to the number of petitions you can sign. Feel free to support causes that resonate with you and share them with others to gather more support.";
        case userMessage.includes("is there a way to track the progress of petitions i've signed?"):
            return "You can view the progression of signed petitions as well as those you've created using Voice of Unity. After searching for a petition, you can view it in a box model template where you'll see the current sign count and other relevant details. This provides transparency and allows you to track the status of petitions easily.";
        case userMessage.includes("requirements for creating a petition"):
            return "Yes, to create a petition on Voice of Unity, users must fulfill the requirement of being logged in to their accounts. This ensures accountability and platform integrity.";
        case userMessage.includes("how does voice of unity ensure the security of user data"):
            return "Voice of Unity prioritizes user data security through robust encryption methods, stringent access controls, and regular security audits. Additionally, adherence to privacy regulations ensures comprehensive protection of user information.";
        default:
            return "I'm sorry, I didn't understand that. Can you please rephrase?";
    }
}



function displaySuggestedQuestions() {
    const suggestedQuestions = [
        "<strong>Suggested questions</strong><hr>",
        "1 . What is Voice of Unity and what does it offer?",
        "2 . How can I sign a petition?",
        "3 . How can I create a petition?",
        "4 . How can I search a petition?",
        "5 . How can I sign in?",
        "6 . How can I register?",
        "7 . Can I participate in multiple petitions?",
        "8 . Is there a way to track the progress of petitions I've signed?",
        "9 . Are there any requirements for creating a petition?",
        "10. How does Voice of Unity ensure the security of user data?<br>"
    ];

    // Concatenate all suggested questions into one message
    const allQuestions = suggestedQuestions.join('<br>');

    // Display all suggested questions in one curved message
    appendMessage('💡', allQuestions, 'suggested-questions');
}

// Call the function to display suggested questions
displaySuggestedQuestions();
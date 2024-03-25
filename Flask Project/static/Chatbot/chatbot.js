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

    messageElement.innerHTML = <div class="${messageClass}"><strong>${sender}</strong>: ${message}</div>;
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

        case userMessage.includes("sign"):
            return "To sign a petition, please follow these steps:\n\n" +
                    "1. Login or Register: First, ensure you are logged into the system. If you're not registered yet, you'll need to sign up and provide necessary details, including a facial image for identification purposes.\n\n" +
                    "2. Navigate to User Home Page: After logging in, you'll be directed to your user home page. Here, you'll find various options and features. Look for the 'Sign Petition' button and click on it.\n\n" +
                    "3. Sign Petition Page: Upon clicking the 'Sign Petition' button, you'll be taken to a page displaying all available petitions. Each petition box contains a 'Sign' button. Click on the 'Sign' button corresponding to the petition you wish to support.\n\n" +
                    "By following these steps, you can sign petitions and contribute to causes you care about.";


        case userMessage.includes("கையெழுத்திட"):
            return "மனுவில் கையெழுத்திட, இந்தப் படிகளைப் பின்பற்றவும்:\n\n" +
            "1. உள்நுழையவும் அல்லது பதிவு செய்யவும்: முதலில், நீங்கள் கணினியில் உள்நுழைந்துள்ளீர்கள் என்பதை உறுதிப்படுத்தவும். நீங்கள் இன்னும் பதிவு செய்யவில்லை என்றால், நீங்கள் பதிவுசெய்து, அடையாள நோக்கங்களுக்காக முகப் படம் உட்பட தேவையான விவரங்களை வழங்க வேண்டும்.\n\n" +
            "2. பயனர் முகப்புப் பக்கத்திற்குச் செல் \n" +
            "3. கையொப்பம் மனுப் பக்கம்: 'கையொப்பம் மனு' பொத்தானைக் கிளிக் செய்தவுடன், கிடைக்கக்கூடிய அனைத்து மனுக்களையும் காண்பிக்கும் பக்கத்திற்கு நீங்கள் அழைத்துச் செல்லப்படுவீர்கள். ஒவ்வொரு மனு பெட்டியிலும் 'கையொப்பம்' பொத்தான் உள்ளது. மனுவுடன் தொடர்புடைய 'கையொப்பம்' பொத்தானைக் கிளிக் செய்யவும். நீங்கள் ஆதரிக்க விரும்புகிறீர்கள்.\n\n" +
            "இந்தப் படிகளைப் பின்பற்றுவதன் மூலம், நீங்கள் மனுக்களில் கையொப்பமிடலாம் மற்றும் நீங்கள் அக்கறையுள்ள காரணங்களில் பங்களிக்கலாம்.";        
                    
        case userMessage.includes("what is voice of unity and what does it offer?"):
            return  "Voice of Unity is a pioneering online petition platform dedicated to fostering unity and driving positive change within the Sri Lankan community. Here's what you need to know about our platform:<br><br>" +
            "1. Multi-Language Support: We understand the diverse linguistic landscape of Sri Lanka, which is why Voice of Unity supports multiple languages, ensuring accessibility for all.<br><br>" +
            "2. Smart Chatbot: Our intelligent chatbot is here to assist you every step of the way. Whether you're searching for petitions, signing up, or creating a petition, our chatbot makes the process seamless and intuitive.<br><br>" +
            "3. Petition Management: Voice of Unity empowers users to create petitions on a wide range of issues, from social justice to environmental conservation. You can draft petitions, collect signatures, and track the progress of your campaigns with ease.<br><br>" +
            "4. Facial Recognition Authentication: We prioritize security and integrity. That's why we implement facial recognition authentication during registration and sign-in, ensuring your identity remains protected.<br><br>" +
            "5. Community Engagement: Join a vibrant community of like-minded individuals who are passionate about making a difference. Voice of Unity facilitates discussions, shares updates, and promotes collaboration among users.<br><br>" +
            "6. Transparent and Accountable: We believe in transparency and accountability. You can monitor the status of petitions, track signature counts, and receive updates on campaign outcomes, empowering you to stay informed every step of the way.<br><br>" +
            "Voice of Unity is more than just a platform—it's a movement for positive change. Join us today and be a part of the voice for unity!";

        
            
        case userMessage.includes("1 . ஒற்றுமையின் குரல் என்றால் என்ன, அது என்ன வழங்குகிறது?"):
            return "Voice of Unity என்பது இலங்கை சமூகத்தில் ஒற்றுமையை வளர்ப்பதற்கும் நேர்மறையான மாற்றத்தை ஏற்படுத்துவதற்கும் அர்ப்பணிக்கப்பட்ட ஒரு முன்னோடி ஆன்லைன் மனு தளமாகும். எங்கள் தளத்தைப் பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டியது இங்கே:" +
            "1. பல மொழி ஆதரவு: இலங்கையின் பல்வேறு மொழியியல் நிலப்பரப்பை நாங்கள் புரிந்துகொள்கிறோம், அதனால்தான் ஒற்றுமை குரல் பல மொழிகளை ஆதரிக்கிறது, அனைவருக்கும் அணுகலை உறுதி செய்கிறது.<br><br>" +
            "2. ஸ்மார்ட் சாட்பாட்: ஒவ்வொரு படிநிலையிலும் உங்களுக்கு உதவ எங்கள் அறிவார்ந்த சாட்பாட் உள்ளது. நீங்கள் மனுக்களைத் தேடினாலும், பதிவு செய்தாலும் அல்லது மனுவை உருவாக்கினாலும், எங்கள் சாட்பாட் செயல்முறையை தடையின்றி மற்றும் உள்ளுணர்வுடன் செய்கிறது.<br><br >" +
            "3. மனு மேலாண்மை: Voice of Unity ஆனது சமூக நீதி முதல் சுற்றுச்சூழல் பாதுகாப்பு வரை பல்வேறு பிரச்சனைகளில் மனுக்களை உருவாக்க பயனர்களுக்கு அதிகாரம் அளிக்கிறது. நீங்கள் மனுக்களை வரையலாம், கையொப்பங்களை சேகரிக்கலாம் மற்றும் உங்கள் பிரச்சாரங்களின் முன்னேற்றத்தை எளிதாகக் கண்காணிக்கலாம்.<br>< br>" +
            "4. முக அங்கீகார அங்கீகாரம்: நாங்கள் பாதுகாப்பு மற்றும் ஒருமைப்பாட்டுக்கு முன்னுரிமை அளிக்கிறோம். அதனால்தான், உங்கள் அடையாளம் பாதுகாக்கப்படுவதை உறுதிசெய்து, பதிவு மற்றும் உள்நுழைவின் போது முக அங்கீகார அங்கீகாரத்தை செயல்படுத்துகிறோம்.<br><br>" +
            "5. சமூக ஈடுபாடு: மாற்றத்தை ஏற்படுத்துவதில் ஆர்வமுள்ள ஒத்த எண்ணம் கொண்ட நபர்களின் துடிப்பான சமூகத்தில் சேரவும். ஒற்றுமையின் குரல் விவாதங்களை எளிதாக்குகிறது, புதுப்பிப்புகளைப் பகிர்ந்து கொள்கிறது மற்றும் பயனர்களிடையே ஒத்துழைப்பை ஊக்குவிக்கிறது.<br><br>" +
            "6. வெளிப்படையான மற்றும் பொறுப்புணர்வு: நாங்கள் வெளிப்படைத்தன்மை மற்றும் பொறுப்புணர்வை நம்புகிறோம். நீங்கள் மனுக்களின் நிலையைக் கண்காணிக்கலாம், கையொப்ப எண்ணிக்கையைக் கண்காணிக்கலாம் மற்றும் பிரச்சார முடிவுகள் குறித்த புதுப்பிப்புகளைப் பெறலாம், ஒவ்வொரு படிநிலையிலும் தகவலறிந்திருக்க உங்களுக்கு அதிகாரம் அளிக்கலாம்.<br><br> " +
            "ஒற்றுமையின் குரல் ஒரு தளத்தை விட மேலானது - இது நேர்மறையான மாற்றத்திற்கான இயக்கம். இன்றே எங்களுடன் இணைந்து ஒற்றுமைக்கான குரலின் ஒரு பகுதியாக இருங்கள்!";



        case userMessage.includes("අත්සන්"):
            return ` පෙත්සමක් අත්සන් කිරීමට, කරුණාකර පහත පියවර අනුගමනය කරන්න:<br><br>
            1. පුරනය වීම හෝ ලියාපදිංචි වීම: පළමුව, ඔබ පද්ධතියට ලොග් වී ඇති බව සහතික කර ගන්න. ඔබ තවමත් ලියාපදිංචි වී නොමැති නම්, ඔබ ලියාපදිංචි වී හඳුනාගැනීමේ අරමුණු සඳහා මුහුණේ රූපයක් ඇතුළුව අවශ්‍ය විස්තර සැපයීමට අවශ්‍ය වනු ඇත.<br><br>
            2. පරිශීලක මුල් පිටුව වෙත සංචාලනය කරන්න: පුරනය වීමෙන් පසු, ඔබව ඔබගේ පරිශීලක මුල් පිටුවට යොමු කරනු ඇත. මෙහිදී ඔබට විවිධ විකල්ප සහ විශේෂාංග සොයා ගත හැක. 'පෙත්සම අත්සන් කරන්න.' බොත්තම සොයාගෙන එය මත ක්ලික් කරන්න.<br><br>
            3. අත්සන් කරන්න පෙත්සම් පිටුව: 'පෙත්සම අත්සන් කරන්න' බොත්තම ක්ලික් කළ පසු, පවතින සියලුම පෙත්සම් පෙන්වන පිටුවකට ඔබව ගෙන යනු ඇත. සෑම පෙත්සම් පෙට්ටියකම 'අත්සන්' බොත්තමක් අඩංගු වේ. ඔබ සහාය දීමට බලාපොරොත්තු වන පෙත්සමට අදාළ 'අත්සන්' බොත්තම ක්ලික් කරන්න.<br><br>
            මෙම පියවර අනුගමනය කිරීමෙන්, ඔබට පෙත්සම් අත්සන් කර ඔබ සැලකිලිමත් වන හේතු සඳහා දායක විය හැක.`;
        

        case userMessage.includes("පෙත්සමක් නිර්මාණය"):
                return ` පෙත්සමක් නිර්මාණය කිරීමට, කරුණාකර පහත පියවර අනුගමනය කරන්න:<br><br>
                1. පුරනය වීම හෝ ලියාපදිංචි වීම: පළමුව, ඔබ පද්ධතියට ලොග් වී ඇති බව සහතික කර ගන්න. ඔබ තවමත් ලියාපදිංචි වී නොමැති නම්, ඔබ ලියාපදිංචි වී හඳුනාගැනීමේ අරමුණු සඳහා මුහුණේ රූපයක් ඇතුළුව අවශ්‍ය විස්තර සැපයීමට අවශ්‍ය වනු ඇත.<br><br>
                2. පරිශීලක මුල් පිටුව වෙත සංචාලනය කරන්න: පුරනය වීමෙන් පසු, ඔබව ඔබගේ පරිශීලක මුල් පිටුවට යොමු කරනු ඇත. මෙහිදී ඔබට විවිධ විකල්ප සහ විශේෂාංග සොයා ගත හැක. 'පෙත්සමක් නිර්මාණය' බොත්තම මත ක්ලික් කරන්න.<br><br>
                3. පෙත්සම් විස්තර පුරවන්න: මාතෘකාව, විස්තරය සහ එයට සහාය දක්වන හේතුව ඇතුළුව ඔබේ පෙත්සම පිළිබඳ විස්තර සැපයිය හැකි පෝරමයකට ඔබව යොමු කරනු ඇත.<br><br>
                4. පෙත්සමක් ඉදිරිපත් කරන්න: පෝරමය පිරවීමෙන් පසු ඔබේ පෙත්සම ඉදිරිපත් කරන්න. එය පසුව වේදිකා පරිපාලකයින් විසින් අනුමැතිය සඳහා සමාලෝචනය කරනු ඇත.<br><br>
                5. පෙත්සම් ප්‍රගතිය නිරීක්ෂණය කරන්න: ඔබේ පෙත්සම අනුමත වූ පසු, ඔබට එහි ප්‍රගතිය නිරීක්ෂණය කිරීමට, අත්සන් එකතු කිරීමට සහ ප්‍රජාව අතර එය ප්‍රවර්ධනය කිරීමට හැකිය.<br><br>
                මෙම පියවර අනුගමනය කිරීමෙන්, ඔබට පෙත්සමක් නිර්මාණය කිරීමට සහ ඔබ සැලකිලිමත් වන හේතු පිළිබඳව දැනුවත් කිරීමට හැකිය.`;              
            
        case userMessage.includes("පෙත්සමක් සොයන්නේ"):
            return ` පෙත්සමක් සෙවීමට, කරුණාකර පහත පියවර අනුගමනය කරන්න:<br><br>
            1. පුරනය වීම හෝ ලියාපදිංචි වීම: පළමුව, ඔබ පද්ධතියට ලොග් වී ඇති බව සහතික කර ගන්න. ඔබ තවමත් ලියාපදිංචි වී නොමැති නම්, ඔබ ලියාපදිංචි වී හඳුනාගැනීමේ අරමුණු සඳහා මුහුණේ රූපයක් ඇතුළුව අවශ්‍ය විස්තර සැපයීමට අවශ්‍ය වනු ඇත.<br><br>
            2. පරිශීලක මුල් පිටුව වෙත සංචාලනය කරන්න: පුරනය වීමෙන් පසු, ඔබව ඔබගේ පරිශීලක මුල් පිටුවට යොමු කරනු ඇත. මෙහිදී ඔබට විවිධ විකල්ප සහ විශේෂාංග සොයා ගත හැක. එහි, ඔබට සෙවුම් පැනලයක් පෙනෙනු ඇත. ඔබගේ සෙවුම් පෙත්සමේ ප්‍රධාන මාතෘකාව එක් කර සෙවුම් බොත්තම ක්ලික් කරන්න.<br><br>
            3. 'සොයන්න' බොත්තම ක්ලික් කිරීමෙන් පසු, ඔබව සියලු සෙවුම් ප්‍රතිඵල පෙන්වන පිටුවකට ගෙන යනු ඇත. මෙම පියවර අනුගමනය කිරීමෙන්, ඔබට ඔබේ රුචිකත්වයට අදාළ පෙත්සම් සොයා ගත හැකි අතර ඔබ සැලකිලිමත් වන හේතු සඳහා දායක විය හැක.`;
            
            case userMessage.includes("create"):
                return `Sure, I can help you with that. Steps to create a petition :<br><br>
                <strong>Login or Registration:</strong><br>
                First, you need to log into the system to create a petition. If you're already registered, simply sign in. Otherwise, if you're a new user, you'll need to register by filling out the registration form. During registration, you'll be prompted to add a facial image for identification purposes.<br><br>
                <strong>Navigate to User Home Page:</strong><br>
                Upon logging in, you'll be directed to your user home page. Here, you'll find various options and features. Look for the Create Petition button and click on it.<br><br>
                <strong>Create Petition Form:</strong><br>
                After clicking the Create Petition button, you'll be taken to a form where you can input all the necessary details for your petition. This form typically includes fields for the petition title, description, goals, and any additional information you want to provide. Make sure to fill out the form with valid and relevant details. Additionally, you'll have the option to upload an image to accompany your petition, which can help attract attention and support.<br><br>
                <strong>Submit Your Petition:</strong><br>
                Once you've filled out all the required fields and added an image (if desired), review the information to ensure everything is accurate and complete. Then, press the Submit button to finalize the creation of your petition.<br><br>
                <strong>Confirmation and Publication:</strong><br>
                If you've followed all the steps correctly and provided all the necessary information, your petition will be successfully created and published within the system. Users will now be able to view, sign, and support your petition.<br><br>
                By following these steps, you can effectively create and publish a petition within the system, allowing you to raise awareness and gather support for your cause.`;
            


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
        
         case userMessage.includes("ලියාපදිංචි වීම"):
            return `ලියාපදිංචි වීමට, කරුණාකර පහත පියවර අනුගමනය කරන්න:<br><br>
            1. ප්‍රවේශ ලියාපදිංචි කිරීමේ පෝරමය: ඔබ තවමත් ලියාපදිංචි වී නොමැති නම්, ඔබට ලියාපදිංචි වීමට අවශ්‍ය වනු ඇත. පිවිසුම් පිටුවේ හෝ මුල් පිටුවේ 'ලියාපදිංචිය' හෝ 'ලියාපදිංචි වන්න' විකල්පය සොයා එය මත ක්ලික් කරන්න.<br><br>
            2. ලියාපදිංචි කිරීමේ පෝරමය පුරවන්න: ඔබගේ නම, ඊමේල් ලිපිනය, මුරපදය සහ වෙනත් අවශ්‍ය තොරතුරු වැනි අවශ්‍ය විස්තර සැපයීමට අවශ්‍ය ලියාපදිංචි පෝරමයකට ඔබව යොමු කරනු ඇත.<br><br>
            3. මුහුණු ලියාපදිංචි කිරීමේ විස්තර එක් කරන්න: ලියාපදිංචි පෝරමය ඉදිරිපත් කිරීමෙන් පසු, මුහුණ හඳුනාගැනීමේ අරමුණු සඳහා ඔබේ පද්ධතියේ කැමරාව භාවිතයෙන් ඔබට පින්තූරයක් ගැනීමට අවශ්‍ය පිටුවකට ඔබව සංචාලනය කරනු ඇත.<br><br>
            4. තහවුරු කිරීම: ඔබගේ ලියාපදිංචිය සාර්ථක වූ පසු, ඔබට තහවුරු කිරීමේ පණිවිඩයක් ලැබෙනු ඇති අතර ස්වයංක්‍රීයව පද්ධතියට පුරනය වනු ඇත.`;
                    

        case userMessage.includes("sign in"):
            return `To sign in, please follow these steps:<br><br>
                    1. Access Login Page: If you're already registered, navigate to the login page by clicking on the 'Sign In' or 'Login' option.<br><br>
                    2. Enter Credentials: On the login page, enter your registered email address and password.<br><br>
                    3. Add Facial Recognition: After entering your credentials, you'll be prompted to use facial recognition for additional security. Follow the instructions to capture a picture using your system's camera.<br><br>
                    4. Sign In: After successfully completing the facial recognition, click on the 'Sign In' or 'Login' button to access your account.<br><br>
                    5. Access User Home Page: Upon successful login, you'll be directed to your user home page where you can access various features and options available within the system.`;
        
        case userMessage.includes("පුරනය"):
            return `පුරනය වීමට, කරුණාකර පහත පියවර අනුගමනය කරන්න:<br><br>
            1. පිවිසුම් පිටුවට ප්‍රවේශ වන්න: ඔබ දැනටමත් ලියාපදිංචි වී ඇත්නම්, 'පුරනය වන්න' විකල්පය මත ක්ලික් කිරීමෙන් පිවිසුම් පිටුවට යන්න.<br><br>
            2. අක්තපත්‍ර ඇතුළත් කරන්න: පිවිසුම් පිටුවේ, ඔබගේ ලියාපදිංචි ඊමේල් ලිපිනය සහ මුරපදය ඇතුළත් කරන්න.<br><br>
            3. මුහුණු හඳුනාගැනීම එක් කරන්න: ඔබේ අක්තපත්‍ර ඇතුළත් කිරීමෙන් පසු, අමතර ආරක්ෂාව සඳහා මුහුණු හඳුනාගැනීම භාවිතා කිරීමට ඔබෙන් විමසනු ඇත. ඔබගේ පද්ධතියේ කැමරාව භාවිතයෙන් පින්තූරයක් ගැනීමට උපදෙස් අනුගමනය කරන්න.<br><br>
            4. පුරනය වන්න: මුහුණ හඳුනාගැනීම සාර්ථකව සම්පූර්ණ කිරීමෙන් පසු, ඔබගේ ගිණුමට ප්‍රවේශ වීමට 'පුරනය වන්න' බොත්තම ක්ලික් කරන්න.<br><br>
            5. පරිශීලක මුල් පිටුවට ප්‍රවේශ වන්න: සාර්ථක පුරනය වීමෙන් පසු, ඔබ පද්ධතිය තුළ පවතින විවිධ විශේෂාංග සහ විකල්ප වෙත ප්‍රවේශ විය හැකි ඔබගේ පරිශීලක මුල් පිටුව වෙත ඔබව යොමු කරනු ඇත.`;
                    

        case userMessage.includes("thank you"):
            return "You're welcome!"; 
            
        case userMessage.includes("ස්තූතියි"):
            return "සහාය වීම සතුටකි."; 
            
        case userMessage.includes("நன்றி"):
            return "நன்றி!"; 
            


        case userMessage.includes("can i participate in multiple petitions?"):
            return "Yes, you can participate in multiple petitions on Voice of Unity. There is no limit to the number of petitions you can sign. Feel free to support causes that resonate with you and share them with others to gather more support.";

        case userMessage.includes("පෙත්සම්වලට සහභාගී"):
            return "ඔව්, ඔබට බහුවිධ පෙත්සම්වලට සහභාගී විය හැක. ඔබට අත්සන් කළ හැකි පෙත්සම් ගණනට සීමාවක් නැත. ඔබ සමඟ අනුනාද වන හේතුවලට සහය දැක්වීමට අවස්ථාව සලසන්න සහ තවත් සහයෝගයක් රැස් කර ගැනීමට ඒවා අන් අය සමඟ බෙදා ගන්න.";


        case userMessage.includes("පෙත්සම්වල ප්‍රගතිය"):
            return "ඔබට අත්සන් කරන ලද පෙත්සම්වල ප්‍රගතිය මෙන්ම ඔබ නිර්මාණය කර ඇති ඒවාද නැරඹිය හැක. පෙත්සමක් සෙවීමෙන් පසු, ඔබට එය කොටු ආකෘති අච්චුවකින් බැලිය හැකි අතර එහිදී ඔබට වත්මන් සලකුණු ගණන සහ අනෙකුත් අදාළ විස්තර පෙනෙනු ඇත. මෙය විනිවිදභාවයක් සපයන අතර පෙත්සම්වල තත්ත්වය පහසුවෙන් නිරීක්ෂණය කිරීමට ඔබට ඉඩ සලසයි.";
        
        
            case userMessage.includes("requirements for creating a petition"):
            return "Yes, to create a petition on Voice of Unity, users must fulfill the requirement of being logged in to their accounts. This ensures accountability and platform integrity.";
        
            case userMessage.includes("අවශ්‍යතා"):
                return "ඔව්, පෙත්සමක් නිර්මාණය කිරීම සඳහා, පරිශීලකයන් ඔවුන්ගේ ගිණුම් වෙත පුරනය වීමේ අවශ්‍යතාවය සපුරාලිය යුතුය. මෙය වගවීම සහ වේදිකාවේ අඛණ්ඩතාව සහතික කරයි.";

        
            case userMessage.includes("how does voice of unity ensure the security of user data"):
            return "Voice of Unity prioritizes user data security through robust encryption methods, stringent access controls, and regular security audits. Additionally, adherence to privacy regulations ensures comprehensive protection of user information.";
        
            case userMessage.includes("how does voice of unity ensure the security of user data"):
                return "සමාජ හඩ වෙබ් අඩවිය ශක්තිමත් සංකේතාංකන ක්‍රම, දැඩි ප්‍රවේශ පාලන සහ නිත්‍ය ආරක්‍ෂක විගණන හරහා පරිශීලක දත්ත ආරක්‍ෂාවට ප්‍රමුඛත්වය දෙයි. අතිරේකව, පුද්ගලිකත්ව රෙගුලාසි පිළිපැදීම පරිශීලක තොරතුරුවල විස්තීර්ණ ආරක්ෂාව සහතික කරයි.";

            case userMessage.includes("එකමුතු හඬ යනු "):
                return  "එකමුතු හඬ යනු ශ්‍රී ලාංකීය ප්‍රජාව තුළ සමගිය පෝෂණය කිරීම සහ ධනාත්මක වෙනසක් ඇති කිරීම සඳහා කැප වූ පුරෝගාමී සබැඳි පෙත්සම් වේදිකාවකි. අපගේ වේදිකාව පිළිබඳව ඔබ දැනගත යුතු දේ මෙන්න:<br></br>" +
                "1. බහු-භාෂා සහාය: ශ්‍රී ලංකාවේ විවිධ භාෂාමය භූ දර්ශනය අපි තේරුම් ගනිමු, ඒ නිසා එකමුතු හඬ සියලු දෙනාටම ප්‍රවේශවීමේ හැකියාව සහතික කරමින් බහු භාෂාවලට සහය දක්වයි.<br><br>" +
                "2. විශෙ ්ෂිත සහාය: අපගේ බුද්ධිමත් චැට්බෝට් සෑම පියවරකදීම ඔබට සහාය වීමට මෙහි ඇත. ඔබ පෙත්සම් සොයමින් සිටියත්, ලියාපදිංචි වීම හෝ පෙත්සමක් නිර්මාණය කළත්, අපගේ චැට්බෝට් ක්‍රියාවලිය බාධාවකින් තොරව සහ අවබෝධාත්මක කරයි.<br><br >" +
                "3. පෙත්සම් කළමණාකරණය: එකමුතු හඬ සමාජ සාධාරණත්වයේ සිට පරිසර සංරක්ෂණය දක්වා පුළුල් පරාසයක ගැටළු සම්බන්ධයෙන් පෙත්සම් නිර්මාණය කිරීමට පරිශීලකයින්ට බලය ලබාදේ. ඔබට පෙත්සම් කෙටුම්පත් කිරීමට, අත්සන් එකතු කිරීමට සහ ඔබේ ව්‍යාපාරවල ප්‍රගතිය පහසුවෙන් නිරීක්ෂණය කළ හැක.<br>" +
                "4. මුහුණු හඳුනාගැනීමේ සත්‍යාපනය: අපි ආරක්‍ෂාවට සහ අඛණ්ඩතාවට ප්‍රමුඛත්වය දෙන්නෙමු. ලියාපදිංචි කිරීමේදී සහ පුරනය වීමේදී අපි ඔබේ අනන්‍යතාවය ආරක්‍ෂිතව පවතින බව සහතික කරමින් මුහුණු හඳුනාගැනීමේ සත්‍යාපනය ක්‍රියාත්මක කරන්නේ එබැවිනි. " +
                "<br>5. ප්‍රජා සහභාගීත්වය: වෙනසක් කිරීමට දැඩි උනන්දුවක් දක්වන සමාන අදහස් ඇති පුද්ගලයින්ගේ ප්‍රබෝධමත් ප්‍රජාවකට සම්බන්ධ වන්න. එකමුතු හඬ සාකච්ඡා සඳහා පහසුකම් සපයයි, යාවත්කාලීන කිරීම් බෙදා ගනී, සහ පරිශීලකයින් අතර සහයෝගීතාව ප්‍රවර්ධනය කරයි.<br><br>" +
                "6. පාරදෘශ්‍ය සහ වගවීම: අපි විනිවිදභාවය සහ වගවීම ගැන විශ්වාස කරනවා. ඔබට පෙත්සම් වල තත්ත්වය නිරීක්ෂණය කිරීමට, අත්සන් ගණන නිරීක්ෂණය කිරීමට සහ ප්‍රචාරක ප්‍රතිඵල පිළිබඳ යාවත්කාලීන ලබා ගැනීමට හැකි වන අතර, සෑම පියවරකදීම දැනුවත්ව සිටීමට ඔබට බලය ලබාදේ.<br><br> " +
                "එක්සත්කමේ හඬ හුදු වේදිකාවකට වඩා වැඩි ය-එය ධනාත්මක වෙනසක් සඳහා වූ ව්‍යාපාරයකි. අදම අප හා එක් වී සමගිය සඳහා හඬේ කොටස්කරුවෙකු වන්න!";
        
        
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
        "10. How this petition system ensure the security of user data?<br>"
    ];

    // Concatenate all suggested questions into one message
    const allQuestions = suggestedQuestions.join('<br>');

    // Display all suggested questions in one curved message
    appendMessage('💡', allQuestions, 'suggested-questions');
}

// Call the function to display suggested questions
displaySuggestedQuestions();
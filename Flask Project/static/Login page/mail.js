
window.onload = function () {
    const firebaseConfig = {
        apiKey: "AIzaSyCHo3GsutqlcVaSrCT3IgyzG6iRce4-egM",
        authDomain: "voc-sdgp.firebaseapp.com",
        databaseURL: "https://voc-sdgp-default-rtdb.firebaseio.com",
        projectId: "voc-sdgp",
        storageBucket: "voc-sdgp.appspot.com",
        messagingSenderId: "158804183426",
        appId: "1:158804183426:web:a814aabef72fd4dcaaa79b"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Form submission function for login
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get values from the form
        const gmail = document.getElementById("gmail").value;
        const password = document.getElementById("password").value;

        // Sign in with Firebase Authentication
        firebase.auth().signInWithEmailAndPassword(gmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Login successful!");
                
                // Redirect to the main page
                window.location.href = "/recog"; // Update with the correct main page URL
            })
            .catch((error) => {
                alert("Error logging in: " + error.message);
                console.error("Error logging in:", error);
            });
    });
}



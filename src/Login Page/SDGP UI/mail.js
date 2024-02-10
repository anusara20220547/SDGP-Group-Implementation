const firebaseConfig = {
    apiKey: "AIzaSyCHo3GsutqlcVaSrCT3IgyzG6iRce4-egM",
    authDomain: "voc-sdgp.firebaseapp.com",
    databaseURL: "https://voc-sdgp-default-rtdb.firebaseio.com",
    projectId: "voc-sdgp",
    storageBucket: "voc-sdgp.appspot.com",
    messagingSenderId: "158804183426",
    appId: "1:158804183426:web:a814aabef72fd4dcaaa79b"
};

firebase.initializeApp(firebaseConfig);

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    // Simulate checking user existence and redirection
    checkUserExists(name, password);
});

var contactFormDB = firebase.database().ref("contactForm");

const checkUserExists = (name, password) => {
    contactFormDB.orderByChild("name").equalTo(name).once("value")
        .then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val();

                // Check for multiple records with the same name
                if (Object.keys(userData).length > 1) {
                    alert("Multiple records found for the same name. Using the first one.");
                }

                const storedData = Object.values(userData)[0]; // Assuming one record

                if (password === storedData.password) {
                    alert("Login successful!");
                    window.location.href = "../../Home Page/Home Page.html";
                } else {
                    alert("Login unsuccessful. Incorrect password.");
                }
            } else {
                alert("Login unsuccessful. User not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching data from Firebase:", error);
            alert("Error fetching data from Firebase. Please try again later.");
        });
};







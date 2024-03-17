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

  // Check if the connection to the database is successful
  try {
    firebase.database();
    
  } catch (error) {
    alert("Error connecting to Firebase database: " + error.message);
    console.error("Error connecting to Firebase database:", error);
  }

  // Form submission function for petitions
  document.querySelector(".sign-up-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value;
    const password = document.getElementById("password1").value;
    const gmail = document.getElementById("gmail1").value;

    // Check if the Gmail field includes "@"
    if (gmail.includes("@")) {
      checkUserExists(name, gmail, password);
    } else {
      alert("Invalid email format. Please include '@' in the email.");
    }
  });

  const checkUserExists = (name, gmail, password) => {
    const contactFormDB = firebase.database().ref('alldata/authentication');

    contactFormDB.orderByChild("gmail").equalTo(gmail).once("value", snapshotEmail => {
      if (snapshotEmail.exists()) {
        alert("You are already registered to the system. Please use sign in!");
        window.location.href = "/loginp";
      } else {
        contactFormDB.orderByChild("name").equalTo(name).once("value", snapshotName => {
          if (snapshotName.exists()) {
            alert("Username already exists. Please choose a different one.");
          } else {
            // Save user information in local storage
            localStorage.setItem('userName', name);
            localStorage.setItem('userGmail', gmail);
            localStorage.setItem('userPassword', password);
            
            // Proceed to save user information in the database
            saveMessages(name, gmail, password);
          }
        });
      }
    });
  };

  const saveMessages = (name, gmail, password) => {
    const auth = firebase.auth();
    const contactFormDB = firebase.database().ref('alldata/authentication');
  
    auth.createUserWithEmailAndPassword(gmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const newauthenticationRef = contactFormDB.child(user.uid);
  
        // Save additional information including the user's name and password
        newauthenticationRef.set({
          name: name,
          gmail: gmail,
          password: password, // Add the user's password to the database
          signcount: 0
        }).then(() => {
          alert("Registration successful! Redirecting to the main page.");
          window.location.href = "/index"; // Navigate to the home page
          document.getElementById("authentication").reset();
        }).catch((error) => {
          console.error("Error uploading authentication data:", error);
        });
      })
      .catch((error) => {
        alert("Error creating user: " + error.message);
        console.error("Error creating user:", error);
      });
  };
  
}

 

  
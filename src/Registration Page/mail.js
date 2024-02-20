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
    alert("Firebase database connection successful!");
  } catch (error) {
    alert("Error connecting to Firebase database: " + error.message);
    console.error("Error connecting to Firebase database:", error);
  }

  // Form submission function for petitions
  document.getElementById("authentication").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const gmail = document.getElementById("gmail").value;

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
        window.location.href = "../Login Page/SDGP UI/SDGP.html";
      } else {
        contactFormDB.orderByChild("name").equalTo(name).once("value", snapshotName => {
          if (snapshotName.exists()) {
            alert("Username already exists. Please choose a different one.");
          } else {
            saveMessages(name, gmail, password);
          }
        });
      }
    });
  };

  const saveMessages = (name, gmail, password) => {
    const contactFormDB = firebase.database().ref('alldata/authentication');
    const newauthenticationRef = contactFormDB.push();

    newauthenticationRef.set({
      name: name,
      password: password,
      gmail: gmail
    }).then(() => {
      alert("Registration successful! Redirecting to the main page.");
      window.location.href = "mainPage.html";
      document.getElementById("contactForm").reset();
    }).catch((error) => {
      alert("Error uploading authentication data: " + error.message);
      console.error("Error uploading authentication data:", error);
    });
  };
};

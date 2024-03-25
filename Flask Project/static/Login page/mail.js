// Selecting the sign-in button element
const sign_in_btn = document.querySelector("#sign-in-btn");

// Selecting the sign-up button element
const sign_up_btn = document.querySelector("#sign-up-btn");

// Selecting the container element
const container = document.querySelector(".container");

// Adding event listener to the sign-up button to switch to sign-up mode
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

// Adding event listener to the sign-in button to switch to sign-in mode
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



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
  document.querySelector(".sign-in-form").addEventListener("submit", function (event) {
      event.preventDefault();

      // Get values from the form
      const gmail = document.getElementById("gmail").value;
      const password = document.getElementById("password").value;

      // Sign in with Firebase Authentication
      firebase.auth().signInWithEmailAndPassword(gmail, password)
          .then((userCredential) => {
              const user = userCredential.user;
              alert("Login credentials are correct. Please show your face for identification.");
              
              // Redirect to the main page
              window.location.href = "/recog"; 
          })
          .catch((error) => {
              alert("Error logging in: " + error.message);
              console.error("Error logging in:", error);
          });
  });


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
            
            // Proceed to save user information in the database
            saveMessages(name, gmail, password);
          }
        });
      }
    });
  };

  const saveMessages = (name, gmail) => {
    const auth = firebase.auth();
    const contactFormDB = firebase.database().ref('alldata/authentication');
  
    auth.createUserWithEmailAndPassword(gmail)
      .then((userCredential) => {
        const user = userCredential.user;
        const newauthenticationRef = contactFormDB.child(user.uid);
  
        // Save additional information including the user's name
        newauthenticationRef.set({
          name: name,
          gmail: gmail,
          signcount: 0 
        }).then(() => {
          alert("Registration credentials saved successfully.Please register your face.");
          window.location.href = "/index"; 
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


// Function to handle password reset
const handlePasswordReset = (event) => {
  event.preventDefault();
  const email = document.getElementById("gmail").value;

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent! Please check your email.");
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    });
};

// Add event listener to "Forgot Password" link
const forgotPasswordLink = document.getElementById("forgot-password-link");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", handlePasswordReset);
}
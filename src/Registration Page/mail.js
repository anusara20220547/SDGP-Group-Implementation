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

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var gmail = getElementVal("gmail");
  var password = getElementVal("password");

  // Check if the gmail field includes "@"
  if (gmail.includes("@")) {
      checkUserExists(name, gmail, password);
  } else {
      alert("Invalid email format. Please include '@' in the email.");
  }
}

const checkUserExists = (name, gmail, password) => {
  contactFormDB.orderByChild("gmail").equalTo(gmail).once("value", snapshotEmail => {
    if (snapshotEmail.exists()) {
      alert("You are already registered to the system.Please use sign in!");
      window.location.href = "../Login Page/SDGP UI/SDGP.html";
    } else {
      contactFormDB.orderByChild("name").equalTo(name).once("value", snapshotName => {
        if (snapshotName.exists()) {
          alert("Username already exists. Please choose a different one.");
        } else {
          saveMessages(name, gmail, password);
          alert("Registration successful! Redirecting to the main page.");
          window.location.href = "mainPage.html";
          document.getElementById("contactForm").reset();
        }
      });
    }
  });
};


const saveMessages = (name, gmail, password) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
      name: name,
      gmail: gmail,
      password: password,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};


  


  
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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        // Display user information on the page
        document.getElementById('gmailDisplay').innerText = user.email || 'N/A';

        // Load profile picture if available
        loadProfilePicture(user.uid);

        // Fetch additional user details from the database
        const userRef = firebase.database().ref('alldata/authentication/' + user.uid);
        userRef.once('value')
            .then(snapshot => {
                const userData = snapshot.val();
                if (userData && userData.name) {
                    // Update the displayed username on the page
                    document.getElementById('usernameDisplay').innerText = userData.name;
                } else {
                    console.warn('Username not found in the database.');
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error.message);
            });
    } else {
        // User is signed out, you might want to redirect to the login page
        window.location.href = "/login.html";
    }
});
function updateUsername() {
    const newUsername = document.getElementById('newUsername').value;

    // Update the username in the Firebase Realtime Database
    const userRef = firebase.database().ref('alldata/authentication/' + firebase.auth().currentUser.uid);
    userRef.update({ name: newUsername })
        .then(() => {
            // Update the displayed username on the page
            document.getElementById('usernameDisplay').innerText = newUsername;
            alert("Username updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating username:", error.message);
            alert("Error updating username: " + error.message);
        });
}

function validateAndUpdateUsername() {
const newUsername = document.getElementById('newUsername').value;

// Check if the new username is not empty
if (newUsername.trim() !== '') {
    // If the new username is not empty, proceed to update the username
    updateUsername();
} else {
    // If the new username is empty, display an alert or take appropriate action
    alert("Please enter a valid username before updating.");
}
}

// Function to update the password
function updatePassword() {
const newPassword = document.getElementById('newPassword').value;
const user = firebase.auth().currentUser;

// Prompt the user to reauthenticate by entering their password
const promptUserForPassword = () => {
const password = prompt("To perform this action, please enter your password:");

// Use the entered password to reauthenticate the user
const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);

return user.reauthenticateWithCredential(credentials);
};

// Reauthenticate user before updating the password
promptUserForPassword()
.then(() => {
    // If reauthentication is successful, update the password
    return user.updatePassword(newPassword);
})
.then(() => {
    alert("Password updated successfully!");
})
.catch((error) => {
    console.error("Error updating password:", error.message);
    alert("Error updating password: " + error.message);
});
}

function validateAndUpdateProfilePicture() {
const profilePictureInput = document.getElementById('profilePictureInput');
const profilePictureFile = profilePictureInput.files[0];

// Check if a file has been selected
if (profilePictureFile) {
    // If a file is selected, proceed to update the profile picture
    updateProfilePicture();
} else {
    // If no file is selected, display an alert or take appropriate action
    alert("Please select an image before updating the profile picture.");
}
}

// Function to update the profile picture
function updateProfilePicture() {
    const profilePictureInput = document.getElementById('profilePictureInput');
    const profilePictureFile = profilePictureInput.files[0];

    // Update the profile picture in Firebase Storage
    const storageRef = firebase.storage().ref('profilePictures/' + firebase.auth().currentUser.uid);
    storageRef.put(profilePictureFile)
        .then((snapshot) => {
            // Get the download URL of the uploaded file
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
            // Update the displayed profile picture on the page
            document.getElementById('profilePictureDisplay').src = downloadURL;
            alert("Profile picture updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating profile picture:", error.message);
            alert("Error updating profile picture: " + error.message);
        });
}

function loadProfilePicture(userId) {
    const storageRef = firebase.storage().ref('profilePictures/' + userId);

    storageRef.getDownloadURL()
        .then((downloadURL) => {
            // Update the displayed profile picture on the page
            document.getElementById('profilePictureDisplay').src = downloadURL;
        })
        .catch((error) => {
            // Handle if no profile picture is available
            console.error("Error loading profile picture:", error.message);

            // If profile picture is not available, add a dummy image
            document.getElementById('profilePictureDisplay').src = '../static/images/user pro pic.png';
        });
}

// Function to logout
function logout() {
    firebase.auth().signOut()
        .then(() => {
            // Redirect to the login page after successful logout
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("Error during logout:", error.message);
        });
}
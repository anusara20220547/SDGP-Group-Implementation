// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCHo3GsutqlcVaSrCT3IgyzG6iRce4-egM",
    authDomain: "voc-sdgp.firebaseapp.com",
    databaseURL: "https://voc-sdgp-default-rtdb.firebaseio.com",
    projectId: "voc-sdgp",
    storageBucket: "voc-sdgp.appspot.com",
    messagingSenderId: "158804183426",
    appId: "1:158804183426:web:a814aabef72fd4dcaaa79b"
};


    // Initialize Firebase with the provided configuration
    firebase.initializeApp(firebaseConfig);

    try {
        firebase.database();
        firebase.storage();
        fetchPetitionData(); // Fetch and display images on page load
    } catch (error) {
        alert("Error connecting to Firebase database: " + error.message);
        console.error("Error connecting to Firebase database:", error);
    }

// Function to fetch petition data from Firebase database
function fetchPetitionData() {
    const petitionsRef = firebase.database().ref('alldata/petitions');

    petitionsRef.on('value', (snapshot) => {
        const petitions = snapshot.val();
        // Iterate through the petitions and display the images
        for (const petitionId in petitions) {
            const petition = petitions[petitionId];
            displayImage(petition.imageURL);
        }
    });
}



// Function to display an image on the webpage
function displayImage(imageURL) {
    const container = document.getElementById("image-container");

    // Create an img element
    const imgElement = document.createElement("img");
    imgElement.src = imageURL;

    // Append the img element to the container
    container.appendChild(imgElement);
}


// Function to upload an image to Firebase storage
function uploadImage(mainTitle, file, subTitle) {
    return new Promise((resolve, reject) => {
        const sanitizedMainTitle = mainTitle ? sanitizeForStorage(mainTitle) : 'untitled';
        const sanitizedSubTitle = subTitle ? sanitizeForStorage(subTitle) : 'untitled';

        const fileName = ${sanitizedMainTitle}_${sanitizedSubTitle}.${file.name.split('.').pop()};
        const storageRef = firebase.storage().ref(petitionImages/${sanitizedMainTitle}/${fileName});
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress tracking if needed
            },
            (error) => {
                reject(error);
            },
            () => {
                // Image uploaded successfully, now get the download URL
                storageRef.getDownloadURL()
                    .then((downloadURL) => {
                        resolve(downloadURL); // Resolve with the full download URL
                    })
                    .catch((urlError) => {
                        reject(urlError);
                    });
            }
        );
    });
}


// Function to create a petition and upload associated image
function createPetitionAndUploadImage(event) {
    event.preventDefault();

    const username = localStorage.getItem('userName');

    if (!username) {
        alert("Username not found in local storage. Please log in.");
        return;
    }

    // Get form input values
    const title = document.getElementById("title").value;
    const sub = document.getElementById("sub").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("Category-details").value;
    const fileInput = document.getElementById("imageInput");
    const accountname = document.getElementById("aname").value;
    const accountno = document.getElementById("ano").value;
    const bankname = document.getElementById("bname").value;
    const branchname = document.getElementById("brname").value;


    // Upload the image, then save petition data with download URL
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        uploadImage(title, file, sub)
            .then((downloadURL) => {
                saveDownloadLinkToDatabase(downloadURL, title, sub, description, category, username, accountname, accountno, bankname, branchname);
            })
            .catch((error) => {
                alert("Error uploading image: " + error.message);
                console.error("Error uploading image:", error);
            });
    } else {
        alert("Please select an image before submitting the form.");
    }
}


// Function to save petition data and image URL to Firebase database
function saveDownloadLinkToDatabase(downloadURL, title, sub, description, category, username,accountname,accountno,bankname,branchname) {
const petitionsRef = firebase.database().ref('alldata/petitions');
const newPetitionRef = petitionsRef.push();


// Data to be saved in the database
const petitionData = {
Sub_title: sub,
description: description,
main_title: title,
category: category,
imageURL: downloadURL,
signs: 0,
username: username, 
accountName : accountname,
accountNo : accountno,
branchName : branchname,
bankName : bankname
};


// Set data in the database
newPetitionRef.set(petitionData)
.then(() => {
    alert("Petition data and image uploaded successfully!");
})
.catch((error) => {
    alert("Error updating petition data: " + error.message);
    console.error("Error updating petition data:", error);
});
}


function sanitizeForStorage(input) {
    // Remove characters not allowed in Firebase Storage paths
    return input.replace(/[.#$[\]/]/g, '-');
}
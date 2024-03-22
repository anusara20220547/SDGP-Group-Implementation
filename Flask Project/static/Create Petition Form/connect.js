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
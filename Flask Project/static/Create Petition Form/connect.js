window.onload = function () {
            // Your Firebase configuration
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
                firebase.storage(); // Initialize storage
                alert("Firebase database connection successful!");
            } catch (error) {
                alert("Error connecting to Firebase database: " + error.message);
                console.error("Error connecting to Firebase database:", error);
            }
        };

        function createPetition() {
            // Get values from the form
            const title = document.getElementById("title").value;
            const sub = document.getElementById("sub").value;
            const description = document.getElementById("description").value;
            const category = document.getElementById("Category-details").value;
            const fileInput = document.getElementById("file");

            // Check if a file is selected
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];

                // Create a reference to the 'alldata/petitions' node in the database
                const petitionsRef = firebase.database().ref('alldata/petitions');

                // Push data to the 'alldata/petitions' node and let Firebase generate a unique key
                const newPetitionRef = petitionsRef.push();

                // Set the data within the unique petition node
                const petitionData = {
                    Sub_title: sub,
                    description: description,
                    main_title: title,
                    category: category
                };

                // Use Promise.all to wait for both image upload and petition data update
                Promise.all([
                    uploadImage(newPetitionRef.key, file),
                    updatePetitionData(newPetitionRef, petitionData)
                ]).then(() => {
                    alert("Petition data and image uploaded successfully!");
                    // You can add any additional logic or redirect the user after successful data upload
                }).catch((error) => {
                    alert("Error: " + error.message);
                    console.error("Error:", error);
                });
            } else {
                alert("Please select an image before submitting the form.");
            }
        }

        function uploadImage(petitionKey, file) {
            return new Promise((resolve, reject) => {
                const storageRef = firebase.storage().ref('petitionImages/' + petitionKey + '/' + file.name);
                const uploadTask = storageRef.put(file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Progress tracking if needed
                        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        // Image uploaded successfully
                        resolve();
                    }
                );
            });
        }

        function updatePetitionData(newPetitionRef, petitionData) {
            return new Promise((resolve, reject) => {
                newPetitionRef.set(petitionData)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
}
const localStorageUsername = localStorage.getItem('userName');
        document.addEventListener('DOMContentLoaded', function () {
            
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

            // Retrieve the clicked petition title from local storage
            const clickedPetitionTitle = localStorage.getItem('clickedPetitionTitle');

            if (clickedPetitionTitle) {
                const petitionsRef = firebase.database().ref('alldata/petitions');

                // Change .once('value') to .on('value') to listen for real-time updates
                 petitionsRef.orderByChild('main_title')
                .equalTo(clickedPetitionTitle)
                .on('value', snapshot => {
                    snapshot.forEach(petition => {
                        const petitionData = petition.val();

                        // Create HTML elements to display petition details
                        const petitionDetailsContainer = document.getElementById('petition-details');
                        petitionDetailsContainer.innerHTML = `
                            <h2>${petitionData.main_title}</h2>
                            <h3>${petitionData.Sub_title}</h3>
                            <img src="${petitionData.imageURL}" alt="Petition Image">
                            <p>Category: ${petitionData.category}</p>
                            <br><br>
                            <p>${petitionData.description}</p>
                            <br><br>
                            <p>Signs: <span id="signCount">${petitionData.signs}</span><p>
                            <br><br>
                            <button id="signButton">Sign</button>
                            <br><br>
                            <p>Created by: ${petitionData.username}</p>
                            <br><br>
                            <h3>Donation Details :</h3>
                            <p>Account Name: ${petitionData.accountName}</p>
                            <p>Account No: ${petitionData.accountNo}</p>
                            <p>Bank Name: ${petitionData.bankName}</p>
                            <p>Branch Name: ${petitionData.branchName}</p>
                            <br><br>
                        `;

                        // Get the sign button and sign count element
                        const signButton = document.getElementById('signButton');

                        // Add event listener to the sign button
                        signButton.addEventListener('click', () => {
                            // Update sign count in the database
                            const updatedSigns = petitionData.signs + 1;
                            petitionsRef.child(petition.key).update({ signs: updatedSigns });
                        });

                        // Enable delete option if username matches with local storage username
                        if (localStorageUsername === petitionData.username) {
                            const deleteButton = document.createElement('button');
                            signButton.remove();
                            deleteButton.textContent = 'Delete';
                            deleteButton.addEventListener('click', () => {
                                // Confirm before deletion
                                const confirmDelete = confirm("Are you sure you want to delete this petition?");
                                if (confirmDelete) {
                                    petitionsRef.child(petition.key).remove();
                                    petitionDetailsContainer.innerHTML = '';
                                    localStorage.removeItem('clickedPetitionTitle');
                                }
                            });
                            petitionDetailsContainer.appendChild(deleteButton);
                        }
                    });
                },
                error => {
                    console.error('Error fetching petition details:', error);
                });

            // Remove the clicked petition title from local storage after use
            localStorage.removeItem('clickedPetitionTitle');
        } else {
            console.error('No clicked petition title found in local storage.');
        }
    });
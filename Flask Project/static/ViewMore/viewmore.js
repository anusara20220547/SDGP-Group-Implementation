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

    const loadPetitionDetails = () => {
        const clickedPetitionTitle = localStorage.getItem('clickedPetitionTitle');

        if (clickedPetitionTitle) {
            const petitionsRef = firebase.database().ref('alldata/petitions');

            petitionsRef.orderByChild('main_title')
                .equalTo(clickedPetitionTitle)
                .once('value')
                .then(snapshot => {
                    snapshot.forEach(petition => {
                        const petitionData = petition.val();
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
                            ${(localStorageUsername !== petitionData.username) ? '<button id="signButton">Sign</button>' : ''}
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

                        const signButton = document.getElementById('signButton');

                        if (signButton) {
                            signButton.addEventListener('click', () => {
                                const updatedSigns = petitionData.signs + 1;
                                petitionsRef.child(petition.key).update({ signs: updatedSigns });
                            });
                        }

                        if (localStorageUsername === petitionData.username) {
                            const deleteButton = document.createElement('button');
                            deleteButton.textContent = 'Delete';
                            deleteButton.addEventListener('click', () => {
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
                })
                .catch(error => {
                    console.error('Error fetching petition details:', error);
                });
        } else {
            console.error('No clicked petition title found in local storage.');
        }
    };

    // Load petition details when the page is loaded
    loadPetitionDetails();
});
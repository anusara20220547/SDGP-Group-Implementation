import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCHo3GsutqlcVaSrCT3IgyzG6iRce4-egM",
    authDomain: "voc-sdgp.firebaseapp.com",
    databaseURL: "https://voc-sdgp-default-rtdb.firebaseio.com",
    projectId: "voc-sdgp",
    storageBucket: "voc-sdgp.appspot.com",
    messagingSenderId: "158804183426",
    appId: "1:158804183426:web:a814aabef72fd4dcaaa79b"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {

    window.searchPetition = function () {
        var searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
        console.log('Search Term: ' + searchTerm);

        var petitionsRef = ref(database, 'alldata/petitions');

        get(petitionsRef).then((snapshot) => {
            console.log('Firebase data retrieved successfully.');

            if (snapshot.exists()) {
                var filteredResults = [];

                snapshot.forEach((childSnapshot) => {
                    var petitionData = childSnapshot.val();

                    if ((petitionData.main_title && petitionData.main_title.toLowerCase().includes(searchTerm)) ||
                        (petitionData.Sub_title && petitionData.Sub_title.toLowerCase().includes(searchTerm)) ||
                        (petitionData.category && petitionData.category.toLowerCase().includes(searchTerm)) ||
                        (petitionData.description && petitionData.description.toLowerCase().includes(searchTerm))) {
                        filteredResults.push(petitionData);
                    }
                });

                // Display searched results in the console
                console.log('Searched Results:', filteredResults);

                // Redirect to grid.html with filtered results as a query parameter
                if (filteredResults.length > 0) {
                    var filteredResultsString = encodeURIComponent(JSON.stringify(filteredResults));
                    window.location.href = '/Grid?results=' + filteredResultsString;
                } else {
                    console.log('No matching petitions found.');
                }
            } else {
                console.log('No petitions found.');
            }
        }).catch((error) => {
            console.error('Error retrieving data from Firebase:', error);
        });
    }
});

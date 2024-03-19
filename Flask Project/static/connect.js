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
        // Get the search input value
        var searchInput = document.getElementById('search-input').value;

        // Check if the search input is not empty
        if (searchInput.trim() !== '') {
            // Set the search input value in local storage
            localStorage.setItem('userSearch', searchInput);

            // Navigate to the "/search" page
            window.location.href = '/search';
        }
    }

    const signPetitionButton = document.getElementById('signPetitionButton');

        // Add a click event listener to the button
        signPetitionButton.addEventListener('click', function () {
            // Replace 'newPage.html' with the actual URL of the page you want to navigate to
            window.location.href = '/Grid';
        });
});

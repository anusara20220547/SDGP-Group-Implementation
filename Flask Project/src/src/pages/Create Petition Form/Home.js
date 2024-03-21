// HomePage.js

import React, { useState } from 'react';
import backgroundImg from './images/divider.png';
import NavigationBar from './NavigationBar';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const searchPetitions = () => {
    var searchTerm = searchInput.trim().toLowerCase();
    console.log('Search Term: ' + searchTerm);

    var petitionsRef = ref(database, 'alldata/petitions');

    get(petitionsRef)
      .then((snapshot) => {
        console.log('Firebase data retrieved successfully.');

        if (snapshot.exists()) {
          var filteredResults = [];

          snapshot.forEach((childSnapshot) => {
            var petitionData = childSnapshot.val();

            if (
              (petitionData.main_title && petitionData.main_title.toLowerCase().includes(searchTerm)) ||
              (petitionData.Sub_title && petitionData.Sub_title.toLowerCase().includes(searchTerm)) ||
              (petitionData.category && petitionData.category.toLowerCase().includes(searchTerm)) ||
              (petitionData.description && petitionData.description.toLowerCase().includes(searchTerm))
            ) {
              filteredResults.push(petitionData);
            }
          });

          // Display searched results in the console
          console.log('Searched Results:', filteredResults);

          // Set the filtered results in the state
          setSearchInput('');

          // Use useNavigate to navigate to /grid with filteredResults as state
          navigate('/grid', { state: { filteredResults } });
        } else {
          console.log('No petitions found.');
          alert('No petitions found.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving data from Firebase:', error);
        alert('Error retrieving data from Firebase: ' + error.message);
      });
  };

  return (
    <div>
      <NavigationBar />
      <div className="wrapper">
        <div className="box box1">
          <div className="box-content">
            <h1>Sign For Change: Your Voice Matters</h1>
            <h3>
              Unleash Your Voice For Change! Voice Of Unity Online Petition System Lets You Create And Sign Petitions Effortlessly. Join The Movement, Make A Difference. Start Or Sign A Petition Now.
            </h3>
            <div className="search-panel">
              <input
                type="text"
                className="search-input"
                placeholder="Search Petition..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="search-button" onClick={searchPetitions}>
                Search
              </button>
            </div>
            <div className="create-panel-home">
              <button className="create-button-home" onClick={() => navigate('/create-petition')}>
                Create Petition
              </button>
            </div>
            <div className="sign-panel-home">
              <button className="sign-button-home" onClick={searchPetitions}>
                Sign Petition
              </button>
            </div>
          </div>
          <img src={backgroundImg} alt="Image description" className="box-image" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

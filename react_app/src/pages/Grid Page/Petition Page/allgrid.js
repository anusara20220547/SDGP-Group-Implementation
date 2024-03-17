import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import './allgrid.module.css'; 
import backgroundImage from '../images/Background3.jpg';

const YourReactComponent = () => {
  const [petitionsData, setPetitionsData] = useState([]);

  useEffect(() => {
    const fetchPetitionsData = async () => {
      const firebaseConfig = {
        apiKey: "AIzaSyCHo3GsutqlcVaSrCT3IgyzG6iRce4-egM",
        authDomain: "voc-sdgp.firebaseapp.com",
        databaseURL: "https://voc-sdgp-default-rtdb.firebaseio.com",
        projectId: "voc-sdgp",
        storageBucket: "voc-sdgp.appspot.com",
        messagingSenderId: "158804183426",
        appId: "1:158804183426:web:a814aabef72fd4dcaaa79b"
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const petitionsRef = firebase.database().ref('alldata/petitions');
      const snapshot = await petitionsRef.once('value');
      const data = snapshot.val();

      if (data) {
        const petitionsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPetitionsData(petitionsArray);
      }
    };

    fetchPetitionsData();
  }, []);



  return (
    <div id="gridbody">
      <div className="blog-header">
        <img src={backgroundImage} alt="Blog Header Image" className="blog-image" />
        <div className="blog-header-text">
          <h2>Trending Petitions</h2>
          <h8>Discover exciting stories and updates and vote.</h8>
        </div>
      </div>

      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 py-5" id="dishes-container">
          {petitionsData.map((petition) => (
            <div key={petition.id} className="col">
              <div className="wwwcard">
                <img className="wcard-img" src={petition.imageURL} alt={petition.main_title} />
                <div className="wcard-body">
                  <h5 className="wcard-title">{petition.main_title}</h5>
                  <h6 className="wcard-subtitle">{petition.Sub_title}</h6>
                  <p className="wcard-text">
                    {petition.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourReactComponent;
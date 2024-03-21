import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import backgroundImage from './images/Background3.jpg';
import './grid.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const GridPage = () => {
  const location = useLocation();
  const filteredResults = location.state ? location.state.filteredResults : [];
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [petitionsData, setPetitionsData] = useState([]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (description, limit) => {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return description;
    }
  };

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
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trending Petitions</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <link href="NavigationCSS.css" rel="stylesheet" />
      </head>
      <body>
          <div className="blog-header">
            <img src={backgroundImage} alt="Blog Header Image" className="blog-header-image" />
            <div className="blog-header-text">
              <h2 className="blog-title">Trending Petitions</h2>
              <h8 className="blog-subtitle">Discover exciting stories and updates and vote.</h8>
            </div>
          </div>

          <div className="container py-5">
            <div className="row py-5" id="petitions-container">
              {filteredResults.map((petition) => (
                <div key={petition.id} className="col-6">
                  <div className="card mb-4" id={`petition-${petition.id}`}>
                  <div className="card-right">
                      <img src={petition.imageURL} alt={petition.main_title} className="card-img-top" />
                    </div>
                    <div className="card-left">
                      <div className="card-body">
                        <h5 className="card-title">{petition.main_title}</h5>
                        <h6 className="card-subtitle">{petition.Sub_title}</h6>
                        <p className="card-text">
                          <span className={showFullDescription ? 'full' : 'truncated'}>
                            {showFullDescription
                              ? petition.description
                              : truncateDescription(petition.description, 30)}
                          </span>
                        </p>
                        {petition.description.length > 30 && (
                          <p
                            className="text-center see-more"
                            onClick={toggleDescription}
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                          >
                            {showFullDescription ? 'See Less' : 'See More'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </body>
      </html>
    
  );
};

export default GridPage;

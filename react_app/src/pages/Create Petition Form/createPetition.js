import React, { useState, useEffect } from 'react';
// Correct import for initializeApp
import firebase from 'firebase/compat/app';
import './Cpetition.css';

import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const PetitionForm = () => {
  const [title, setTitle] = useState('');
  const [sub, setSub] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "voice-of-unity-4c438.firebaseapp.com",
      databaseURL: "https://voice-of-unity-4c438-default-rtdb.firebaseio.com",
      projectId: "voice-of-unity-4c438",
      storageBucket: "voice-of-unity-4c438.appspot.com",
      messagingSenderId: "355946163414",
      appId: "1:355946163414:web:dca36508d976753ebf6d77"
    };

    try {
      firebase.initializeApp(firebaseConfig);
      alert('Firebase database connection successful!');
      fetchPetitionData(); // Fetch and display images on page load
    } catch (error) {
      alert('Error connecting to Firebase database: ' + error.message);
      console.error('Error connecting to Firebase database:', error);
    }
  }, []);

  function fetchPetitionData() {
    const petitionsRef = firebase.database().ref('alldata/petitions');

    petitionsRef.on('value', (snapshot) => {
      const petitions = snapshot.val();
      // Iterate through the petitions and display the images
      for (const petitionId in petitions) {
        const petition = petitions[petitionId];
        
      }
    });
  }

  function uploadImage(mainTitle, file, subTitle) {
    return new Promise((resolve, reject) => {
      const sanitizedMainTitle = mainTitle ? sanitizeForStorage(mainTitle) : 'untitled';
      const sanitizedSubTitle = subTitle ? sanitizeForStorage(subTitle) : 'untitled';

      const fileName = `${sanitizedMainTitle}_${sanitizedSubTitle}.${file.name.split('.').pop()}`;
      const storageRef = firebase.storage().ref(`petitionImages/${sanitizedMainTitle}/${fileName}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress tracking if needed
        },
        (error) => {
          reject(error);
        },
        () => {
          // Image uploaded successfully, now get the download URL
          storageRef
            .getDownloadURL()
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

  function createPetitionAndUploadImage(event) {
    event.preventDefault();

    if (file) {
      uploadImage(title, file, sub)
        .then((downloadURL) => {
          saveDownloadLinkToDatabase(downloadURL, title, sub, description, category);
        })
        .catch((error) => {
          alert('Error uploading image: ' + error.message);
          console.error('Error uploading image:', error);
        });
    } else {
      alert('Please select an image before submitting the form.');
    }
  }

  function saveDownloadLinkToDatabase(downloadURL, title, sub, description, category) {
    const petitionsRef = firebase.database().ref('alldata/petitions');
    const newPetitionRef = petitionsRef.push();

    const petitionData = {
      Sub_title: sub,
      description: description,
      main_title: title,
      category: category,
      imageURL: downloadURL
    };

    newPetitionRef
      .set(petitionData)
      .then(() => {
        alert('Petition data and image uploaded successfully!');
      })
      .catch((error) => {
        alert('Error updating petition data: ' + error.message);
        console.error('Error updating petition data:', error);
      });
  }

  function sanitizeForStorage(input) {
    // Remove characters not allowed in Firebase Storage paths
    return input.replace(/[.#$[\]/]/g, '-');
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="container">
      <form id="petitions" onSubmit={createPetitionAndUploadImage}>
        <h1>Create Petition form</h1>

        <h4>Add main title</h4>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <h4>Add sub title</h4>
        <input
          type="text"
          id="sub"
          placeholder="Sub title"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          required
        />

        <h4>Add description</h4>
        <textarea
          id="description"
          placeholder="Type your message here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <h4>Category</h4>
        <br></br>
        <select
          name="Category-details"
          id="Category-details"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="social">social</option>
          <option value="political">political</option>
          <option value="ethical">ethical</option>
        </select>
        <br />

        <h4>Media Upload</h4>
        <br />
        <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} />
        <input type="submit" id="button" />
      </form>

      {/* Container for displaying images */}
      <div id="image-container"></div>
    </div>
  );
};

export default PetitionForm;







import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, push, orderByChild, equalTo } from 'firebase/database';
import './styleReg.css';
import { get } from 'firebase/database';


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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const existingUser = await checkUserExists(name, gmail);
      if (existingUser) {
        alert("User already exists. Please choose a different username or sign in.");
      } else {
        await createUserWithEmailAndPassword(auth, gmail, password);
        alert("Registration successful! Redirecting to the main page.");
        window.location.href = "mainPage.html";
      }
    } catch (error) {
      alert("Error during registration: " + error.message);
      console.error("Error during registration:", error);
    }
  };

  const checkUserExists = async (name, gmail) => {
    const authenticationRef = ref(database, 'alldata/authentication');
    const snapshot = await get(authenticationRef);
  
    let exists = false;
    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      if (user.gmail === gmail || user.name === name) {
        exists = true;
      }
    });
  
    return exists;
  };
  

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <div className="form-popup">
      <div className="form-box signup">
        <div className="form-details">
          <h1>Create Account</h1>
          <p>To become a part of our community, please sign up using your personal information.</p>
        </div>

        <div className="form-content">
          <h2>Create an account</h2>
          <h3>Let's get started!</h3>
          <br />

          <form onSubmit={handleSignUp} id="authentication">
            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <label htmlFor="name">Enter your username</label>
              <input type="text" id="name" placeholder="Enter your username here" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <br />

            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <label htmlFor="gmail">Enter your gmail</label>
              <input type="text" id="gmail" placeholder="Enter your gmail here" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
            </div>
            <br />

            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <label htmlFor="password">Enter your password</label>
              <input type="password" id="password" placeholder="Enter your password here" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <br />

            <div className="policy-text">
              <input type="checkbox" id="policy" required />
              <label htmlFor="policy">
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
            </div>

            <br />

            <button type="submit">Sign Up</button>

            <button type="button" onClick={handleGoogleSignIn}>Continue with Gmail</button>
          </form>

          <br />

          <div className="bottom-link">
            Already have an account? <a href="#">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;




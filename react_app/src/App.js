import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './pages/Create Petition Form/NavigationBar';
import HomePage from './pages/Create Petition Form/Home';
import AboutPage from './pages/Create Petition Form/createPetition';
import ContactPage from './pages/Create Petition Form/createPetition';
import LoginPage from './pages/Login Page/logpage';
import SignupPage from './pages/Registration Page/register';
import CreatePetition from './pages/Create Petition Form/createPetition';
import GridPage from './pages/Create Petition Form/grid';
import SignPetition from './pages/Create Petition Form/grid';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/grid" element={<GridPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/create-petition" element={<CreatePetition />} />
          <Route exact path="/signpetition" element={<SignPetition />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




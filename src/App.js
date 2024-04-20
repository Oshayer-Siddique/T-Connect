import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./Components/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import RegistrationForm from "./Components/RegistrationForm";

import {BrowserRouter, Routes, Route} from 'react-router-dom';




function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/registration" element={<RegistrationForm/>} />

            <Route path="/profile/:userId" element={<ProfilePage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

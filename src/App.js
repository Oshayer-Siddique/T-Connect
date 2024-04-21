import logo from "./logo.svg";
import "./App.css";

import LoginPage from "./Components/LoginPage";
import DoctorLoginPage from "./Components/DoctorLoginPage";
import HospitalLoginPage from "./Components/HospitalLoginPage";
import ProfilePage from "./Components/ProfilePage";
import RegistrationForm from "./Components/RegistrationForm";
import MyDocumentsPage from "./Components/MyDocumentsPage";
import FileUploader from "./Components/FileUploader";
import HomePage from "./Components/Homepage";
import HospitalProfilePage from "./Components/HospitalProfilePage";
import AddDoctor from "./Components/AddDoctor";
import DoctorsList from "./Components/DoctorsList";
import DoctorProfilePage from "./Components/DoctorProfilePage";


import {BrowserRouter, Routes, Route} from 'react-router-dom';




function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/patient" element={<LoginPage/>} />
            <Route path="/doctor" element={<DoctorLoginPage/>} />
            <Route path="/hospital" element={<HospitalLoginPage/>} />
            <Route path="/registration" element={<RegistrationForm/>} />

            <Route path="/profile/:userId" element={<ProfilePage/>} />
            <Route path="/my-documents/:userId" element={<MyDocumentsPage/>} />
            <Route path="/add-doctor/:userId" element={<AddDoctor/>} />
            <Route path="/doctor-list/:userId" element={<DoctorsList/>} />
            <Route path="/profileh/:userId" element={<HospitalProfilePage/>} />
            <Route path="/profiled/:userId" element={<DoctorProfilePage/>} />

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

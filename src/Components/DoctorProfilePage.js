import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/DoctorProfilePage.css'; // Import CSS file for styling

function DoctorProfilePage() {
    const { userId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [id, setId] = useState('');
    const [patient, setPatient] = useState(null);

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tconnect/doctorprofile/${userId}`);
                setDoctor(response.data.user);
            } catch (error) {
                setError('Error fetching hospital profile');
            }
        };

        fetchDoctorProfile();
    }, [userId]);


    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tconnect/patientsearch', { _id: id });
            setPatient(response.data);
            setError('');
        } catch (error) {
            setPatient(null);
            setError('Patient not found');
        }
    };


    return (
        <div>
            {/* <nav className="navbar">
                <ul>
                    <li><Link to={`/profiled/${userId}`}>Profile</Link></li>
                    <li><Link to={`/doctor-list/${userId}`}>List of Doctor</Link></li>
                    <li><Link to={`/add-doctor/${userId}`}>Add Doctor</Link></li>
                </ul>
            </nav> */}

            <div className="profile-container">
                {error && <div className="error-message">{error}</div>}
                {doctor && (
                    <div className="user-profile">
                        <h2>User Profile</h2>
                        <p><strong>Name:</strong> {doctor.name}</p>
                        <p><strong>Email:</strong> {doctor.email}</p>
                        
                    </div>
                )}
            </div>


            <div>
            <h2>Patient Search</h2>
            <input
                type="text"
                placeholder="Enter patient ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <div>{error}</div>}
            {patient && (
                <div>
                    <h3>Patient Details</h3>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    {/* Display additional patient details here */}
                </div>
            )}
        </div>




        </div>
    );
}

export default DoctorProfilePage;




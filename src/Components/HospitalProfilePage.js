import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/HospitalProfilePage.css'; // Import CSS file for styling

function HospitalProfilePage() {
    const { userId } = useParams();
    const [hospital, setHospital] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHospitalProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tconnect/hospitalprofile/${userId}`);
                setHospital(response.data.user);
            } catch (error) {
                setError('Error fetching hospital profile');
            }
        };

        fetchHospitalProfile();
    }, [userId]);

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><Link to={`/profile/${userId}`}>Profile</Link></li>
                    <li><Link to={`/doctor-list/${userId}`}>List of Doctor</Link></li>
                    <li><Link to={`/add-doctor/${userId}`}>Add Doctor</Link></li>
                </ul>
            </nav>

            <div className="profile-container">
                {error && <div className="error-message">{error}</div>}
                {hospital && (
                    <div className="user-profile">
                        <h2>User Profile</h2>
                        <p><strong>Name:</strong> {hospital.name}</p>
                        <p><strong>Email:</strong> {hospital.email}</p>
                        <p><strong>Phone:</strong> {hospital.phone}</p>
                        
                        <p><strong>Address:</strong> {hospital.address}</p>
                    </div>
                )}
            </div>




        </div>
    );
}

export default HospitalProfilePage;




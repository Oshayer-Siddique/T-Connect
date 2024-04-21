import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/DoctorProfilePage.css'; // Import CSS file for styling

function DoctorProfilePage() {
    const { userId } = useParams();
    const [doctor, setDoctor] = useState(null);
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




        </div>
    );
}

export default DoctorProfilePage;




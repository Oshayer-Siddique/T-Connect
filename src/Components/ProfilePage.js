import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/ProfilePage.css'; // Import CSS file for styling

function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tconnect/patientprofile/${userId}`);
                setUser(response.data.user);
            } catch (error) {
                setError('Error fetching user profile');
            }
        };

        fetchUserProfile();
    },[userId]);

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><Link to={`/profile/${userId}`}>Profile</Link></li>
                    <li><Link to={`/my-documents/${userId}`}>My Documents</Link></li>
                    <li><Link to={`/add-document/${userId}`}>Add Document</Link></li>
                </ul>
            </nav>
            <div className="profile-container">
                {error && <div className="error-message">{error}</div>}
                {user && (
                    <div className="user-profile">
                        <h2>Patient Profile</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Blood Type:</strong> {user.blood}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Emergency Contact Person:</strong> {user.emergencyP}</p>
                        <p><strong>Emergency Contact Number:</strong> {user.emergencycont}</p>
                        <p><strong>Diseases:</strong> {user.Disease}</p>
                        <p><strong>Allergies:</strong> {user.Allergies}</p>

                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;


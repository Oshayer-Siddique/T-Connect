import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ProfilePage.css'; // Import CSS file for styling

function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    //const userId = match.params.userId

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tocnnect/patientprofile/${userId}`);
                setUser(response.data.user);
            } catch (error) {
                setError('Error fetching user profile');
            }
        };

        fetchUserProfile();
    },[userId]);

    return (
        <div className="profile-container">
            {error && <div className="error-message">{error}</div>}
            {user && (
                <div className="user-profile">
                    <h2>User Profile</h2>
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
                </div>
            )}
        </div>
    );
}

export default ProfilePage;

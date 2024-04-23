import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/ProfilePage.css'; // Import CSS file for styling

function AdminProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tconnect/adminprofile/${userId}`);
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
                    <li><Link to={`/profilea/${userId}`}>Profile</Link></li>

                </ul>
            </nav>
            <div className="profile-container">
                {error && <div className="error-message">{error}</div>}
                {user && (
                    <div className="user-profile">
                        <h2>User Profile</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>


                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminProfilePage;


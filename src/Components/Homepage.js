import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css'

function HomePage() {
    return (
        <div className="home-container">
            <h2>Welcome to T-Connect</h2>
            <div className="options">
                <div className="option">
                    <Link to="/hospital">Hospital</Link>
                </div>
                <div className="option">
                    <Link to="/doctor">Doctor</Link>
                </div>
                <div className="option">
                    <Link to="/patient">Patient</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

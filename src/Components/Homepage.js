import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css'

function HomePage() {
    return (

        <div>
        <div class="ripple-background">
        <div class="circle xxlarge shade1"></div>
        <div class="circle xlarge shade2"></div>
        <div class="circle large shade3"></div>
        <div class="circle medium shade4"></div>
        <div class="circle small shade5"></div>
      </div>

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

        </div>
    );
}

export default HomePage;

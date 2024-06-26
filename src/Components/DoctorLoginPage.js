import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../styles/DoctorLoginPage.css';

function DoctorLoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/tconnect/doctorlogin', { userId, password });

            if (response.status === 200) {
                // Redirect to profile page upon successful login
                console.log('Login successful. Response data:', response.data);
                navigate(`/profiled/${userId}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid userId or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>

    <div class="ripple-background">
        <div class="circle xxlarge shade1"></div>
        <div class="circle xlarge shade2"></div>
        <div class="circle large shade3"></div>
        <div class="circle medium shade4"></div>
        <div class="circle small shade5"></div>
      </div>

        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Doctor Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="userId">Doctor ID</label>
                    <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>

        </div>

            {/* <div className="registration-link">
                <p>Don't have an account? <Link to="/registration">Register here</Link></p>
            </div> */}

        </div>
    );
}

export default DoctorLoginPage;

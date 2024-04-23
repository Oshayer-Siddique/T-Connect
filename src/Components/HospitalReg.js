import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddDoctor.css';

function HospitalReg() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        type:'',
        license:'',
        
    });
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null); // State to store user ID


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/tconnect/hospitalregister', formData);

            if (response.status === 201) {

                const { userId } = response.data;
                setUserId(userId);
                // Registration successful, do something
                console.log('Registration successful. User ID:', userId);
            }
        } catch (error) {
            // Handle error
            console.error('Registration error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="registration-container">

 
            
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Add Hospital</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>


                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Gender:</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Diagonistic">Diagonistic Center</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="license">License:</label>
                    <textarea id="license" name="license" value={formData.license} onChange={handleChange}></textarea>
                </div>



                <button type="submit" className="register-btn">Create Account</button>
            </form>

            {userId && (
                <div className="user-id-section">
                    <h3>User ID:</h3>
                    <p>{userId}</p>
                </div>
            )}
        </div>
    );
    
}

export default HospitalReg;

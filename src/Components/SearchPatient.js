import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/SearchPatient.css'
function SearchPatient(){

    const { userId } = useParams();

    const [patient, setPatient] = useState(null);
    const [id, setId] = useState('');
    const [error, setError] = useState('');

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

        <nav className="navbar">
                <ul>
                    <li><Link to={`/profiled/${userId}`}>Profile</Link></li>
                    <li><Link to={`/search/${userId}`}>Search Patient</Link></li>

                </ul>
            </nav>






            <div>
            <h2>Patient Search</h2>

            <div className="searchbar">
            <input
                type="text"
                placeholder="Enter patient ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            </div>

            <button onClick={handleSearch}>Search</button>



            {error && <div>{error}</div>}
            {patient && (
                <div>
                    <h3>Patient Details</h3>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Phone:</strong> {patient.phone}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Blood:</strong> {patient.blood}</p>
                    <p><strong>Disease:</strong> {patient.Disease}</p>
                    <p><strong>Allergies:</strong> {patient.Allergies}</p>

                    {/* Display additional patient details here */}
                    <Link to={`/get-files/${id}`}><button>Get Files</button></Link>

                </div>
            )}
        </div>
            



        </div>
    );

}

export default SearchPatient;

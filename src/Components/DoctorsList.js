import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

import "../styles/DoctorsList.css";

function DoctorsList() {
    const { userId } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tconnect/listdoctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to={`/profileh/${userId}`}>Profile</Link>
          </li>
          <li>
            <Link to={`/doctor-list/${userId}`}>List of Doctor</Link>
          </li>
          <li>
            <Link to={`/add-doctor/${userId}`}>Add Doctor</Link>
          </li>
        </ul>
      </nav>
      <h1>List of Doctors</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialized</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialized}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MyDocumentsPage.css'
import { Link, useParams } from 'react-router-dom';


const GetFiles = () => {
  const { userId } = useParams();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tconnect/files');
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/tconnect/files/${filename}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
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
      <h2>Download Files</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <ul>
          {files.map((filename, index) => (
            <li key={index}>
              <button onClick={() => handleDownload(filename)}>{filename}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetFiles;


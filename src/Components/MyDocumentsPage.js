import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDocumentsPage = () => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tconnect/files'); // Assuming your backend server is running on the same host as your React app
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>My Documents</h1>
      {loading && <p>Loading...</p>}
      {!loading && files && (
        <ul>
          {Object.entries(files).map(([fileName, fileContent]) => (
            <li key={fileName}>
              <h3>{fileName}</h3>
              <pre>{fileContent}</pre>
            </li>
          ))}
        </ul>
      )}
      {!loading && !files && <p>No files found.</p>}
    </div>
  );
};


export default MyDocumentsPage;

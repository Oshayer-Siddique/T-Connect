import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
// Import axios for making HTTP requests
import {Cloudinary} from "@cloudinary/url-gen";
import '../styles/FileUploader.css'; // Import your CSS file

const FileUploader = () => {
  const { userId } = useParams();
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFileNames = {};
    droppedFiles.forEach(file => {
      newFileNames[file.name] = file.name; // Initialize new file names with existing names
    });
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setFileNames((prevNames) => ({ ...prevNames, ...newFileNames }));
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFileNames = {};
    selectedFiles.forEach(file => {
      newFileNames[file.name] = file.name; // Initialize new file names with existing names
    });
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setFileNames((prevNames) => ({ ...prevNames, ...newFileNames }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    const updatedFileNames = { ...fileNames };
    delete updatedFileNames[updatedFiles[index].name];
    setFileNames(updatedFileNames);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        const newName = fileNames[file.name] || file.name; // Use new name if available, otherwise keep the original name
        formData.append('files', file, newName);
      });

      const response = await axios.post('http://localhost:5000/tconnect/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      // You can handle the response here, such as showing a success message to the user

      // Clear uploaded files after successful upload
      setFiles([]);
      setFileNames({});
    } catch (error) {
      console.error('Error uploading files:', error.message);
      // You can handle the error here, such as showing an error message to the user
    }
  };



  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to={`/profile/${userId}`}>Profile</Link></li>
          <li><Link to={`/my-documents/${userId}`}>My Documents</Link></li>
          <li><Link to={`/add-document/${userId}`}>Add Document</Link></li>
        </ul>
      </nav>
      <div
        className={`file-uploader ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <div className="drop-area">
          <label htmlFor="fileInput" className="file-input-label">
            <span className="icon">{dragging ? '📁' : '📂'}</span>
            <span className="text">{dragging ? 'Drop files here' : 'Drag & Drop files here'}</span>
          </label>
        </div>
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index}>
                <span className="file-icon">📄</span>
                <input
                  type="text"
                  className="file-name-input"
                  value={fileNames[file.name] || file.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setFileNames((prevNames) => ({ ...prevNames, [file.name]: newName }));
                  }}
                />
                <button className="remove-btn" onClick={() => handleRemoveFile(index)}>
                  Remove
                </button>
                <a href={URL.createObjectURL(file)} className="view-btn" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
        {files.length > 0 && (
          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

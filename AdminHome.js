import React, { useState } from 'react';
import axios from 'axios';
import { FaDownload, FaUpload, FaTrash } from 'react-icons/fa';

const AdminHome = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('cv', selectedFile);

    try {
      await axios.post('http://localhost:8800/api/files/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("File uploaded successfully.");
    } catch (err) {
      console.error("Upload error:", err);
      alert("File upload failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:8800/api/files/delete-cv');
      alert("File deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("File deletion failed.");
    }
  };

  return (
    <div className='h-screen flex justify-center items-center flex-col space-y-4 '>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>
        <FaUpload /> Upload CV
      </button>
      <button onClick={handleDelete}>
        <FaTrash /> Delete CV
      </button>
      <a href="http://localhost:8800/api/files/download-cv" download='cv.pdf' className='bg-white text-black'>
        <FaDownload /> Download CV
      </a>
    </div>
  );
}

export default AdminHome;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/update-profile', {
        rollNumber,
        registerNumber,
      }, {
        headers: { Authorization: localStorage.getItem('token') }
      });

      alert('Profile updated!');
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.msg || 'Update failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Roll Number:</label><br />
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            placeholder="Enter your Roll Number"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Register Number:</label><br />
          <input
            type="text"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            required
            placeholder="Enter your Register Number"
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateProfile;

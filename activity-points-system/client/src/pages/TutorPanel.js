import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TutorPanel = () => {
  const [certs, setCerts] = useState([]);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/certificates/pending', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setCerts(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to fetch pending certificates');
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleAction = async (id, action, comment) => {
    try {
      await axios.put(
        `http://localhost:5000/api/certificates/review/${id}`,
        { action, comment },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      alert(`Certificate ${action}d successfully`);
      fetchCertificates(); // reload list
    } catch (err) {
      alert(err.response?.data?.msg || 'Action failed');
    }
  };

  return (
    <div>
      <h2>Tutor Panel – Pending Certificates</h2>
      {certs.length === 0 ? (
        <p>No pending certificates.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Student</th>
              <th>Title</th>
              <th>Level</th>
              <th>Certificate</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certs.map(cert => (
              <tr key={cert._id}>
                <td>{cert.student.name} ({cert.student.email})</td>
                <td>{cert.title}</td>
                <td>{cert.level}</td>
                <td>
                  <a href={`http://localhost:5000${cert.fileUrl}`} target="_blank" rel="noreferrer">View</a>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Add comment"
                    onChange={e => cert.comment = e.target.value}
                  />
                </td>
                <td>
                  <button onClick={() => handleAction(cert._id, 'approve', cert.comment || '')}>Approve</button>
                  <button onClick={() => handleAction(cert._id, 'reject', cert.comment || '')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TutorPanel;

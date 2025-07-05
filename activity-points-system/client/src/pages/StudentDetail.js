// pages/StudentDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams();
  const [certs, setCerts] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      const res = await axios.get(`http://localhost:5000/api/certificates/student/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setCerts(res.data);
      setStudent(res.data[0]?.student || null);
    };
    fetchCerts();
  }, [id]);

  return (
    <div>
      <h2>📄 Certificates of {student?.name}</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>Status</th>
            <th>Points</th>
            <th>Certificate</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {certs.map(cert => (
            <tr key={cert._id}>
              <td>{cert.title}</td>
              <td>{cert.level}</td>
              <td>{cert.status}</td>
              <td>{cert.points}</td>
              <td>
                <a href={`http://localhost:5000${cert.fileUrl}`} target="_blank" rel="noreferrer">View</a>
              </td>
              <td>{cert.tutorComment || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetail;

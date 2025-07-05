// components/NotificationBar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifs = async () => {
      const res = await axios.get('http://localhost:5000/api/certificates/notifications', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setNotifications(res.data);
    };
    fetchNotifs();
  }, []);

  return (
    <div style={{ background: '#eee', padding: '10px' }}>
      <h4>🔔 New Certificate Uploads</h4>
      {notifications.length === 0 ? <p>No new uploads</p> :
        notifications.map(notif => (
          <div key={notif._id}>
            📄 <strong onClick={() => navigate(`/tutor/student/${notif.student._id}`)} style={{ cursor: 'pointer' }}>
              {notif.student.name}
            </strong> uploaded: <em>{notif.title}</em>
          </div>
        ))}
    </div>
  );
};

export default NotificationBar;

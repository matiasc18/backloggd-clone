import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  // For re-routing
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate('/games');
    }
  }, [user, navigate]);
  if (user) return (
    <div style={{marginTop: '1em', fontSize: '4em', color: 'white', display: 'flex', justifyContent: 'center'}}>
      <span>Hello, { user.username }</span>
    </div>
  )
}

export default Dashboard;
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Timer from './components/Timer';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>FocusFlow</h1>
      {!user && (
        <>
          <Login setUser={setUser} setToken={setToken} />
          <Register />
        </>
      )}
      {user && token && (
        <>
          <h2>Welcome, {user.username}!</h2>
          <Timer />
          <TaskList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
import React, { useContext } from 'react';
import { InactivityContext } from './InactivityContext';

const LockScreen = () => {
  const { isLocked, password, setPassword, handleUnlock } = useContext(InactivityContext);

  if (!isLocked) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h2>Your session has been locked due to inactivity</h2>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px 0', padding: '5px' }}
        />
        <br />
        <button onClick={handleUnlock} style={{ marginRight: '10px' }}>Unlock</button>
        <button onClick={() => window.location.href = '/signup'}>Go to Sign Up</button>
      </div>
    </div>
  );
};

export default LockScreen;
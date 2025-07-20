import './App.css';
import React, { useEffect, useState } from 'react'
import Weather from './displays/weather';
import CanvasLeft from './canvases/CanvasLeft.js';
import CanvasCenter from './canvases/CanvasCenter.js';
import CanvasRight from './canvases/CanvasRight.js';
import ClockThing from './displays/Clock.js';
import config from './config.js';

function App() {
  const [profile, setProfile] = useState('default');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastFetchError, setLastFetchError] = useState(null);

  useEffect(() => {
    let fetchInterval;
    let retryTimeout;

    async function getProfile() {
      try {
        console.log('Fetching profile from:', `${config.apiUrl}/api/profile`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${config.apiUrl}/api/profile`, {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProfile(data.profile);
        setLastFetchError(null);
        setIsOnline(true);
        
        console.log('Profile updated successfully:', data.profile);
        
      } catch (error) {
        console.error('Profile fetch error:', error);
        setLastFetchError(error.message);
        
        if (error.name === 'AbortError') {
          console.log('Request timed out, will retry...');
        }
        
        // Don't immediately set offline for timeout errors, 
        // as the network might still be working
        if (!error.message.includes('fetch')) {
          setIsOnline(false);
        }
        
        // Exponential backoff retry for errors
        clearTimeout(retryTimeout);
        retryTimeout = setTimeout(() => {
          console.log('Retrying profile fetch...');
          getProfile();
        }, 5000); // Wait 5 seconds before retry
      }
    }

    // Network status listeners
    const handleOnline = () => {
      console.log('Network back online');
      setIsOnline(true);
      setLastFetchError(null);
      getProfile(); // Immediately fetch when back online
    };

    const handleOffline = () => {
      console.log('Network went offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial fetch
    getProfile();

    // Set up regular interval (only if online)
    fetchInterval = setInterval(() => {
      if (navigator.onLine) {
        getProfile();
      } else {
        console.log('Skipping fetch - browser reports offline');
      }
    }, 60000); // 1 minute interval

    return () => {
      clearInterval(fetchInterval);
      clearTimeout(retryTimeout);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show connection status in dev mode
  const showDebugInfo = process.env.NODE_ENV === 'development';

  return (
    <div className="App">
      {showDebugInfo && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: isOnline ? 'green' : 'red',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          {isOnline ? 'ONLINE' : 'OFFLINE'}
          {lastFetchError && <div>Error: {lastFetchError.substring(0, 30)}...</div>}
        </div>
      )}
      
      <CanvasRight profile={profile} />
      <ClockThing />
      <Weather />
      <CanvasCenter profile={profile} />
      <CanvasLeft profile={profile} />
    </div>
  );
}

export default App;
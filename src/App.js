import './App.css';
import React, {useEffect, useState} from 'react'
import Weather from './displays/weather';
import CanvasLeft from './canvases/CanvasLeft.js';
import CanvasCenter from './canvases/CanvasCenter.js';
import CanvasRight from './canvases/CanvasRight.js';
import ClockThing from './displays/Clock.js';
import config from './config.js';

function App(){
  const [profile, setProfile] = useState('default')

  useEffect(() => {
    async function getProfile() {
      const response = await fetch(`${config.apiUrl}/api/profile`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfile(data.profile);
    }
    getProfile();

    const interval = setInterval(() => {
          getProfile();
        }, 60000);
        return () => clearInterval(interval);
      }, []);
 

  return (
    <div className="App" >
        <CanvasRight profile={profile} />
        <ClockThing />
        <Weather />
        <CanvasCenter profile={profile} />
        <CanvasLeft profile={profile} />
    </div>
  );
}

export default App;

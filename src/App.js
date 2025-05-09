import './App.css';
import React, {useEffect, useState} from 'react'
import Weather from './displays/weather';
import CanvasLeft from './canvases/CanvasLeft.js';
import CanvasCenter from './canvases/CanvasCenter.js';
import CanvasRight from './canvases/CanvasRight.js';
import ClockThing from './displays/Clock.js';

function App(){
  const [profile, setProfile] = useState('default')

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

import './App.css';
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';
import Transit from './transit';
import Events from './events';
import Weather from './weather';


function App() {
  return (
    <div className="App">
        <h1>
          <Clock format={'h:mm:ss'} interval={1000} ticking={true} />
        </h1>
        <Weather />
        {/* <Events /> */}
      <Transit />
    </div>
  );
}

export default App;

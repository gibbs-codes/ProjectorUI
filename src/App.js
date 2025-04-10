import './App.css';
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';
import Transit from './transit';
import Events from './events';
import Weather from './weather';
import RandomPortraitPainting from './RandomPortraitPainting';

function App() {
  return (
    <div className="App" >
      <div className='clock'>
        <div className='canvasRight'>
          <div>
            <h1>
              <Clock format={'h:mm:ss'} interval={1000} ticking={true} />
            </h1>
          </div>
          <Weather />

        </div>
      </div>
      <div className='canvasCenter'>
        <RandomPortraitPainting/>
      </div>
        {/* <Events /> */}
      <Transit />
    </div>
  );
}

export default App;

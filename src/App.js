import './App.css';
import Clock from 'react-live-clock';
import Transit from './transit';
import Events from './events';
import Weather from './weather';
import RandomPortraitPainting from './RandomPortraitPainting';
import RandomLandscapePainting from './RandomLandscapePainting';

function App(){
  return (
    <div className="App" >
      <div className='canvasRight'>
        <RandomLandscapePainting/>
      </div>
      <div className='clock'>
        <h1>
          <Clock format={'h:mm'} interval={1000} ticking={true} />
        </h1>
      </div>
      <Weather />
      <div className='canvasCenter'>
        <RandomPortraitPainting/>
      </div>
      <Transit />
    </div>
  );
}

export default App;

import React, {useState, useEffect} from "react";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import checkTime from "./checkTime";

export default function Transit() {
    const [busEast, setBusEast] = useState([]);
    const [busWest, setBusWest] = useState([]);
    const [redSouth, setRedSouth] = useState([]);
    const [redNorth, setRedNorth] = useState([]);
    const [brownSouth, setBrownSouth] = useState([]);
    const [brownNorth, setBrownNorth] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getThings();
        }, 60000);
            return () => clearInterval(interval);
    }, []);


  async function getThings() {
    fetch('http://localhost:3001/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => { 
        setBrownNorth(data.brown.north);
        setBrownSouth(data.brown.south);
        setRedNorth(data.red.north);
        setRedSouth(data.red.south);
        setBusEast(data.buses.east);
        setBusWest(data.buses.west);
      }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      })
  }

    return (
        <div className='allRoutes'>
          <div>
            <span className='redDot'></span>
            <div className='transport'>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>NORTH</h3>
                </div>
                  <ul>
                    {redNorth && 
                    redNorth.map((train, index) => (
                      <p key={index}>{checkTime(train)}</p>
                    ))}
                  </ul>
              </div>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>SOUTH</h3>
                </div>
                <ul>
                  {redSouth &&
                  redSouth.map((train, index) => (
                    <p key={index}>{checkTime(train)}</p>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <span className='brownDot'></span>
            <div className='transport'>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>NORTH</h3>
                </div>
                <ul>
                  {brownNorth &&
                  brownNorth.map((train, index) => (
                    <p key={index}>{checkTime(train)}</p>
                  ))}
                </ul>
                </div>
                <div className="oneRoute">
                  <div className='routeHead'>
                    <h3>SOUTH</h3>
                  </div>
                  <ul>
                    {brownSouth && 
                    brownSouth.map((train, index) => (
                      <p key={index}>{checkTime(train)}</p>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
          <div>
            <h3><DirectionsBusIcon/></h3>
            <div className='transport'>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>East</h3>
                </div>
                <ul>
                  {busEast && 
                  busEast.map((bus, index) => (
                    <p key={index}>{checkTime(bus)}</p>
                  ))}
                </ul>
              </div>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>West</h3>
                </div>
                <ul>
                  {busWest &&
                  busWest.map((bus, index) => (
                    <p key={index}>{checkTime(bus)}</p>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
    )


}
export default function TransitSmall(props){

    return (
        <div className='allRoutes'>
          <div>
            <span className='redDot'></span>
            <div className='transport'>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>SOUTH</h3>
                </div>
                <ul>
                  {redSouth &&
                  redSouth.map((train, index) => (
                    <li key={index}>{checkTime(train)}</li>
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
                    <h3>SOUTH</h3>
                  </div>
                  <ul>
                    {brownSouth && 
                    brownSouth.map((train, index) => (
                      <li key={index}>{checkTime(train)}</li>
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
                  <h3>EAST</h3>
                </div>
                <ul>
                  {busEast && 
                  busEast.map((bus, index) => (
                    <li key={index}>{checkTime(bus)}</li>
                  ))}
                </ul>
              </div>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>WEST</h3>
                </div>
                <ul>
                  {busWest &&
                  busWest.map((bus, index) => (
                    <li key={index}>{checkTime(bus)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}
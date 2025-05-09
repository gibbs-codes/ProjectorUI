import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import checkTime from "../../utils/checkTime";

export default function TransitBig (props) {

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
                    {props.redNorth && 
                    props.redNorth.map((train, index) => (
                      <li key={index}>{checkTime(train)}</li>
                    ))}
                  </ul>
              </div>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>SOUTH</h3>
                </div>
                <ul>
                  {props.redSouth &&
                  props.redSouth.map((train, index) => (
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
                  <h3>NORTH</h3>
                </div>
                <ul>
                  {props.brownNorth &&
                  props.brownNorth.map((train, index) => (
                    <li key={index}>{checkTime(train)}</li>
                  ))}
                </ul>
                </div>
                <div className="oneRoute">
                  <div className='routeHead'>
                    <h3>SOUTH</h3>
                  </div>
                  <ul>
                    {props.brownSouth && 
                    props.brownSouth.map((train, index) => (
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
                  {props.busEast && 
                  props.busEast.map((bus, index) => (
                    <li key={index}>{checkTime(bus)}</li>
                  ))}
                </ul>
              </div>
              <div className="oneRoute">
                <div className='routeHead'>
                  <h3>WEST</h3>
                </div>
                <ul>
                  {props.busWest &&
                  props.busWest.map((bus, index) => (
                    <li key={index}>{checkTime(bus)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}
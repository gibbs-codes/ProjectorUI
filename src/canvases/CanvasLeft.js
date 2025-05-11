import Transit from '../displays/transit/transit.js';
import VerticalTimeline from '../displays/tallCal.js';

export default function CanvasLeft(props){

  return (
    <div className='canvasLeft'>
      {props.profile === 'default' ? <Transit /> : <></>}
      {props.profile === 'morning' ? <VerticalTimeline /> : <></>}
      {props.profile === 'work' ? <Transit /> : <></>}
    </div>
  )
}

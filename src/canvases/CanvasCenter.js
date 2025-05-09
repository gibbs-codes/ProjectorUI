import Art from '../displays/art';
import Events from '../displays/events';

export default function CanvasCenter(props){

  return (
    <div className='canvasCenter'>
      {props.profile === 'default' ? <Events /> : <></>}
      {/* {props.profile === 'default' ? <Art vert /> : <></>} */}
      {props.profile === 'morning' ? <Art vert /> : <></>}
      {props.profile === 'afternoon' ? <Art /> : <></>}
      {props.profile === 'evening' ? <Art /> : <></>}
      {props.profile === 'entertain' ? <Art /> : <></>}
    </div>
  )
}

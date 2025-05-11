import Art from '../displays/art';
import ToDos from '../displays/toDos.js';

export default function CanvasRight(props){

  return (
    <div className='canvasRight'>
      {props.profile === 'default' ? <Art/> : <></>}
      {props.profile === 'morning' ? <ToDos /> : <></>}
      {props.profile === 'afternoon' ? <Art /> : <></>}
      {props.profile === 'evening' ? <Art /> : <></>}
      {props.profile === 'entertain' ? <Art /> : <></>}
    </div>
  )
}

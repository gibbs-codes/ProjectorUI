import Art from '../displays/art';
import ToDos from '../displays/toDos.js';
import NextUp from '../displays/nextUp.js';

export default function CanvasRight(props){

  return (
    <div className='canvasRight'>
      {props.profile === 'default' ? <Art/> : <></>}
      {props.profile === 'morning' ? <ToDos /> : <></>}
      {props.profile === 'work' ? <NextUp /> : <></>}
    </div>
  )
}

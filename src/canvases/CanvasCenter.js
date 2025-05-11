import Art from '../displays/art';
import Habits from '../displays/habits';

export default function CanvasCenter(props){

  return (
    <div className='canvasCenter'>
      {props.profile === 'default' ? <Art vert /> : <></>}
      {/* {props.profile === 'default' ? <Art vert /> : <></>} */}
      {props.profile === 'morning' ? <Habits vert /> : <></>}
      {props.profile === 'afternoon' ? <Art /> : <></>}
      {props.profile === 'evening' ? <Art /> : <></>}
      {props.profile === 'entertain' ? <Art /> : <></>}
    </div>
  )
}

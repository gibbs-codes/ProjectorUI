import Art from '../displays/art';
export default function CanvasRight(props){

  return (
    <div className='canvasRight'>
      {props.profile === 'default' ? <Art /> : <></>}
      {props.profile === 'morning' ? <Art /> : <></>}
      {props.profile === 'afternoon' ? <Art /> : <></>}
      {props.profile === 'evening' ? <Art /> : <></>}
      {props.profile === 'entertain' ? <Art /> : <></>}
    </div>
  )
}

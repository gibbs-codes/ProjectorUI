import Transit from '../displays/transit/transit.js';

export default function CanvasLeft(props){

  return (
    <div>
      {props.profile === 'default' ? <Transit /> : <></>}
      {props.profile === 'morning' ? <Transit /> : <></>}
      {props.profile === 'afternoon' ? <Transit /> : <></>}
      {props.profile === 'evening' ? <Transit /> : <></>}
      {props.profile === 'entertain' ? <Transit /> : <></>}
    </div>
  )
}

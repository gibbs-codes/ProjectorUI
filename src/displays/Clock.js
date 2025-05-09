import Clock from 'react-live-clock';


export default function ClockThing(){
  return (
    <div className='clock'>
      <h1>
        <Clock format={'h:mm'} interval={1000} ticking={true} />
      </h1>
    </div>
  )
}

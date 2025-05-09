import React, {useEffect, useState} from "react";

export default function Events(){
    const [today, setToday] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function updateToday() {
            fetch(process.env.REACT_APP_EVENTS_URL)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => { 
                console.log(data)
                setToday(data);
            }).catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            setLoading(false);
        }
        
        updateToday();
    }, [])
    

    return (
        <div>
            {loading ? <></> :
                <div className="calendar">
                    <h2>Today's Agenda:</h2>
                    {today &&
                    today.map((event, index) => (
                        <div key={index} className='event'>
                            <h3>{event.title}</h3>
                            <div>{event.description}</div>
                            <div>{event.start}</div>
                            <div>{event.location}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}
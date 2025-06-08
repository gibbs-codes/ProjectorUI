import React, {useEffect, useState} from "react";

export default function Habits(){
    const [habits, setHabits] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function updateToday() {
            fetch(process.env.REACT_APP_HABITICA_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => { 
                setHabits(data.habits);
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
                <div className="habits">
                    <h2 className="habits">Today's Habits</h2>
                    {habits &&
                    habits.map((event, index) => (
                        <div key={index} className='habit'>
                            <h3 className="habits">{event.text}</h3>
                            <p>Streak: {event.counterUp}</p>
                            {/* <div>{event.start}</div>
                            <div>{event.location}</div> */}
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}
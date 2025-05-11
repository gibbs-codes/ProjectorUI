import React, {useEffect, useState} from "react";

export default function ToDos(){
    const [toDos, setToDos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function updateToday() {
            fetch(process.env.REACT_APP_HABITICA_URL)
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => { 
                setToDos(data.todos);
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
                <div className="todoList">
                    <h2>Today's toDos:</h2>
                    {toDos &&
                    toDos.map((event, index) => (
                        <div key={index} className='event'>
                            <h3>{event.text}</h3>
                            {/* <div>{event.notes}</div>
                            <div>{event.start}</div>
                            <div>{event.location}</div> */}
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}
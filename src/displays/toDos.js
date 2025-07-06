import React, {useEffect, useState} from "react";
import config from "../config";

export default function ToDos(){
    const [toDos, setToDos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function updateToday() {
            fetch(`${config.apiUrl}/api/habitica`)
            .then(response => {
                console.log('Response status:', response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => { 
                console.log('Data received:', data);
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
                    <h2 className="todoList">To Dos:</h2>
                    {toDos &&
                    toDos.map((event, index) => (
                        <div key={index} className='toDo'>
                            <h3 className="todoList">{event.text}</h3>
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
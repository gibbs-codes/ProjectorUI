import React, {useEffect, useState} from "react";

export default function Weather(){
    const [feelsNow, setFeelsNow] = useState('')
    const [aveTempToday, setAveTempToday] = useState('')
    const [tempNow, setTempNow] = useState('')
    const [loading, setLoading] = useState(true)


     useEffect(() => {
        const interval = setInterval(() => {
             getWeather()
        }, 3600000);
            return () => clearInterval(interval);
    }, []);

    async function getWeather() {
        fetch(process.env.REACT_APP_WEATHER_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            setFeelsNow(data.current.feelslike_f)
            setAveTempToday(data.forecast.forecastday[0].day.avgtemp_f)
            setTempNow(data.current.temp_f)
            setLoading(false)
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        })
    }


    return (
        <div>
            {loading && <></>}
            {!loading && <div style={{width: '40%', margin:'auto', marginTop:'2em', marginBottom:'-1em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <div style={{fontSize:'2.5em'}}>{tempNow}°F</div>
                    <div>NOW</div>
                </div>
                <div>
                    <div style={{fontSize:'2.5em'}}>{feelsNow}°F</div>
                    <div>FEELS LIKE</div>
                </div>
                <div>
                    <div style={{fontSize:'2.5em'}}>{aveTempToday}°F</div>
                    <div>TODAY</div>
                </div>
            </div>}
        </div>
    )

}

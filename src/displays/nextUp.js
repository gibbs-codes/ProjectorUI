import React, { useEffect, useState } from 'react';
import { format, parse, isAfter, parseISO } from 'date-fns';
import { MapPin } from 'lucide-react';
import Art from './art';
import config from '../config';

const NextUp = () => {
  const [loading, setLoading] = useState(true);
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    const now = new Date();

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const upcomingEvent = data
          .map(event => {
            const startTime = parseISO(event.start);
            console.log('Parsed start time:', startTime);
            const endTime = parseISO(event.end);
            console.log('Parsed end time:', endTime);
            console.log('Now:', now);
            return { ...event, startTime, endTime };
          })
          .filter(event => isAfter(event.startTime, now))
          .sort((a, b) => a.startTime - b.startTime)[0];

        setNextEvent(upcomingEvent || null);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="p-4 bg-gray-200 rounded-xl">Loading events...</div>;
  }

  if (!loading && !nextEvent) {
    return <Art/>;
  }

  const { title, location, description, startTime, endTime } = nextEvent;

  return (
    <div className="nextUp">
      {console.log(nextEvent)}
      <h2 className="nextTitle">Next Up: {title}</h2>
      <div className="nextRich">
        <div className="nextLocation">
            <MapPin className="w-5 h-5 mr-2 text-gray-400" /> : {location || 'No location provided'}
        </div>
        <p className="nextDetails">{description || 'No details provided'}</p>
        <p className="nextTime">
             {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
        </p>
      </div>
    </div>
  );
};

export default NextUp;
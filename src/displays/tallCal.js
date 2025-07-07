import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import config from '../config';

const TimelineContainer = styled.div`
  width: 370px;
  height: 930px;
  display: grid;
  grid-template-rows: repeat(18, 1fr);
  position: relative;
`;

const HourBlock = styled.div`
  border-bottom: 1px solid #333;
  padding-left: 8px;
  color: #888;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const colors = [
  'rgba(132, 0, 149, 0.68)', // Purple
  'rgba(0, 123, 255, 0.68)', // Blue
  'rgba(40, 167, 69, 0.68)', // Green
  'rgba(255, 193, 7, 0.68)', // Yellow
  'rgba(220, 53, 69, 0.68)', // Red
  'rgba(23, 162, 184, 0.68)', // Teal
];

const EventBlock = styled.div`
  position: absolute;
  left: 50px;
  width: 320px;
  background-color:rgba(132, 0, 149, 0.68);
  color: #fff;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 12px;
  line-height: 1.4;
`;

const hours = [
  '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
  '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
];

const calculatePosition = (startTime, endTime) => {
  const startHour = 6; // Start of the timeline (6 AM)
  const totalMinutes = (24 - startHour) * 60; // Total minutes in the timeline

  // FIXED: Parse time strings in "7:30 AM" format
  const parseTime = (timeString) => {
    // Check if it's already an ISO string (contains 'T' or full date)
    if (timeString.includes('T') || timeString.includes('-')) {
      const date = new Date(timeString);
      return {
        hour: date.getHours(),
        minute: date.getMinutes(),
      };
    }
    
    // Parse "7:30 AM" format
    const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
    const match = timeString.trim().match(timeRegex);
    
    if (!match) {
      console.error('Could not parse time:', timeString);
      return { hour: 6, minute: 0 }; // Default fallback
    }
    
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const period = match[3].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return { hour, minute };
  };

  const { hour: startHourPart, minute: startMinutePart } = parseTime(startTime);
  const { hour: endHourPart, minute: endMinutePart } = parseTime(endTime);

  const startMinutes = (startHourPart * 60 + startMinutePart) - (startHour * 60);
  const endMinutes = (endHourPart * 60 + endMinutePart) - (startHour * 60);

  const yStart = (startMinutes / totalMinutes) * 930; // Map minutes to pixel height
  const height = ((endMinutes - startMinutes) / totalMinutes) * 930;

  return { yStart, height };
};

const VerticalTimeline = () => {
    const [today, setToday] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function updateToday() {
            fetch(`${config.apiUrl}/api/events`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => { 
                console.log('Received events data:', data); // Debug log
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
                <TimelineContainer>
                    {hours.map((hour, index) => (
                        <HourBlock key={index}>{hour}</HourBlock>
                    ))}

                    {today.map((event, index) => {
                        const { yStart, height } = calculatePosition(event.start, event.end);
                        const color = colors[index % colors.length]; // Cycle through the color palette
                        
                        // Format display time properly
                        const formatDisplayTime = (timeString) => {
                            const { hour, minute } = parseTime(timeString);
                            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                            const period = hour >= 12 ? 'PM' : 'AM';
                            return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
                        };
                        
                        // Helper function to parse time (same as above but accessible here)
                        const parseTime = (timeString) => {
                            if (timeString.includes('T') || timeString.includes('-')) {
                                const date = new Date(timeString);
                                return {
                                    hour: date.getHours(),
                                    minute: date.getMinutes(),
                                };
                            }
                            
                            const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
                            const match = timeString.trim().match(timeRegex);
                            
                            if (!match) {
                                return { hour: 6, minute: 0 };
                            }
                            
                            let hour = parseInt(match[1]);
                            const minute = parseInt(match[2]);
                            const period = match[3].toUpperCase();
                            
                            if (period === 'PM' && hour !== 12) {
                                hour += 12;
                            } else if (period === 'AM' && hour === 12) {
                                hour = 0;
                            }
                            
                            return { hour, minute };
                        };
                        
                        return (
                            <EventBlock
                                key={index}
                                style={{ 
                                    top: `${yStart}px`, 
                                    height: `${height}px`, 
                                    backgroundColor: color 
                                }}
                            >
                                <div>{event.title}</div>
                                <div>{formatDisplayTime(event.start)} - {formatDisplayTime(event.end)}</div>
                            </EventBlock>
                        );
                    })}
                </TimelineContainer>
            }
        </div>
    );
};

export default VerticalTimeline;
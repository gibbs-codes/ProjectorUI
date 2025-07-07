import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import config from "../config";

const HabitsContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const HabitsHeader = styled.h2`
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  font-family: "Manrope", sans-serif;
  font-weight: 500;
  color: #333;
  text-align: center;
`;

const HabitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-height: calc(100% - 120px); /* Account for header */
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
`;

const HabitCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border-color: #adb5bd;
  }
`;

const HabitTitle = styled.h3`
  font-size: 1.1rem;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  color: #495057;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  
  /* Truncate long text */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StreakBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: ${props => props.streak > 0 ? 
    'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 
    'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)'
  };
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Manrope", sans-serif;
`;

const StreakIcon = styled.span`
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
  font-family: "Manrope", sans-serif;
  
  .emoji {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .message {
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function Habits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function updateToday() {
            try {
                const response = await fetch(`${config.apiUrl}/api/habitica`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHabits(data.habits || []);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                setHabits([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        }
        
        updateToday();
    }, []);

    const getStreakIcon = (streak) => {
        if (streak === 0) return "💤";
        if (streak < 5) return "🔥";
        if (streak < 15) return "⚡";
        if (streak < 30) return "💪";
        return "🏆";
    };

    if (loading) {
        return (
            <HabitsContainer>
                <LoadingSpinner>
                    <div className="spinner"></div>
                </LoadingSpinner>
            </HabitsContainer>
        );
    }

    return (
        <HabitsContainer>
            <HabitsHeader>Today's Habits</HabitsHeader>
            
            {habits.length === 0 ? (
                <EmptyState>
                    <span className="emoji">✨</span>
                    <div className="message">No habits for today!</div>
                </EmptyState>
            ) : (
                <HabitsGrid>
                    {habits.map((habit, index) => (
                        <HabitCard key={habit.id || index}>
                            <HabitTitle title={habit.text}>
                                {habit.text}
                            </HabitTitle>
                            <StreakBadge streak={habit.counterUp || 0}>
                                <StreakIcon>{getStreakIcon(habit.counterUp || 0)}</StreakIcon>
                                {habit.counterUp || 0} day streak
                            </StreakBadge>
                        </HabitCard>
                    ))}
                </HabitsGrid>
            )}
        </HabitsContainer>
    );
}
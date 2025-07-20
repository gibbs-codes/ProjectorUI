import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import config from "../config";

const HabitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow: hidden; /* Prevent container overflow */
`;

const HabitsHeader = styled.h2`
  font-size: 2.2rem;
  margin: 0 0 1.5rem 0;
  font-family: "Manrope", sans-serif;
  font-weight: 500;
  color: #333;
  text-align: center;
  flex-shrink: 0; /* Don't let header shrink */
`;

const HabitsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1; /* Take up remaining space */
  overflow-y: auto;
  padding-right: 0.5rem; /* Space for scrollbar */
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.3);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,0.5);
  }
`;

const HabitCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0; /* Prevent cards from shrinking */
  min-height: fit-content;
  
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
  margin: 0 0 0.8rem 0;
  line-height: 1.4;
  word-wrap: break-word;
  hyphens: auto;
`;

const StreakBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${props => props.streak > 0 ?
    'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 
    'linear-gradient(135deg, #6c757d 0%, #adb5bd 100%)'
  };
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: "Manrope", sans-serif;
`;

const StreakIcon = styled.span`
  font-size: 1rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: #6c757d;
  font-family: "Manrope", sans-serif;
  
  .emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .message {
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  .loading-text {
    color: #6c757d;
    font-family: "Manrope", sans-serif;
    font-size: 1.1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const HabitsCount = styled.div`
  color: #6c757d;
  font-size: 0.9rem;
  font-family: "Manrope", sans-serif;
  text-align: center;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
`;

export default function Habits() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function updateToday() {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${config.apiUrl}/api/habitica`);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                setHabits(data.habits || []);
            } catch (error) {
                console.error('Error fetching habits:', error);
                setError(error.message);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        }
        
        updateToday();
        
        // Refresh habits every 5 minutes
        const interval = setInterval(updateToday, 300000);
        return () => clearInterval(interval);
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
                <HabitsHeader>Today's Habits</HabitsHeader>
                <LoadingSpinner>
                    <div className="spinner"></div>
                    <div className="loading-text">Loading habits...</div>
                </LoadingSpinner>
            </HabitsContainer>
        );
    }

    if (error) {
        return (
            <HabitsContainer>
                <HabitsHeader>Today's Habits</HabitsHeader>
                <EmptyState>
                    <span className="emoji">⚠️</span>
                    <div className="message">Could not load habits</div>
                </EmptyState>
            </HabitsContainer>
        );
    }

    return (
        <HabitsContainer>
            <HabitsHeader>Today's Habits</HabitsHeader>
            
            {habits.length > 0 && (
                <HabitsCount>
                    {habits.length} habit{habits.length !== 1 ? 's' : ''} for today
                </HabitsCount>
            )}
            
            {habits.length === 0 ? (
                <EmptyState>
                    <span className="emoji">✨</span>
                    <div className="message">No habits for today!</div>
                </EmptyState>
            ) : (
                <HabitsGrid>
                    {habits.map((habit, index) => (
                        <HabitCard key={habit.id || index}>
                            <HabitTitle>
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
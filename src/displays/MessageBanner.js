import React, { useState, useEffect } from 'react';
import config from '../config.js';

function MessageBanner() {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let pollInterval;

    async function checkForMessages() {
      try {
        const response = await fetch(`${config.apiUrl}/api/message/pending`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.message) {
            setCurrentMessage(data.message);
            setIsVisible(true);

            // Auto-hide after duration
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentMessage(null);
              }, 500); // Wait for fade-out animation
            }, data.message.duration || 8000);
          }
        }
      } catch (error) {
        console.error('Error checking for messages:', error);
      }
    }

    // Check immediately
    checkForMessages();

    // Poll every 30 seconds (less frequent since it's not urgent)
    pollInterval = setInterval(checkForMessages, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  if (!currentMessage) return null;

  const getBannerStyle = (priority, type) => {
    const baseStyle = {
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: 1000,
      padding: '15px 30px',
      color: 'white',
      fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '18px',
      fontWeight: '500',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.4s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    };

    // Color schemes that match your ambient aesthetic
    const styles = {
      info: {
        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7))',
        borderTop: '1px solid rgba(59, 130, 246, 0.3)'
      },
      success: {
        background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.9), rgba(34, 197, 94, 0.7))',
        borderTop: '1px solid rgba(34, 197, 94, 0.3)'
      },
      warning: {
        background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.9), rgba(245, 158, 11, 0.7))',
        borderTop: '1px solid rgba(245, 158, 11, 0.3)'
      },
      alert: {
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.7))',
        borderTop: '1px solid rgba(239, 68, 68, 0.3)'
      }
    };

    // Priority adjustments
    const priorityStyles = {
      urgent: {
        fontSize: '20px',
        fontWeight: '600',
        animation: 'bannerPulse 2s ease-in-out infinite'
      },
      high: {
        fontSize: '19px',
        fontWeight: '600'
      },
      normal: {
        fontSize: '18px'
      },
      low: {
        fontSize: '16px',
        opacity: '0.9'
      }
    };

    return {
      ...baseStyle,
      ...styles[type || 'info'],
      ...priorityStyles[priority || 'normal']
    };
  };

  const getIcon = (type, priority) => {
    const iconStyle = {
      fontSize: '20px',
      opacity: 0.9
    };

    const icons = {
      info: '💡',
      success: '✅',
      warning: '⚠️',
      alert: '🚨'
    };

    if (priority === 'urgent') {
      return <span style={iconStyle}>🚨</span>;
    }

    return <span style={iconStyle}>{icons[type] || '💬'}</span>;
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentMessage(null);
    }, 500);
  };

  return (
    <>
      {/* CSS for animations */}
      <style>
        {`
          @keyframes bannerPulse {
            0%, 100% { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            50% { 
              opacity: 0.95;
              transform: translateY(0) scale(1.01);
            }
          }
          
          .banner-dismiss:hover {
            background: rgba(255, 255, 255, 0.2) !important;
          }
        `}
      </style>

      <div style={getBannerStyle(currentMessage.priority, currentMessage.type)}>
        {/* Icon */}
        {getIcon(currentMessage.type, currentMessage.priority)}
        
        {/* Message Text */}
        <div style={{ flex: 1 }}>
          {currentMessage.text}
        </div>

        {/* Source & Time */}
        <div style={{
          fontSize: '14px',
          opacity: 0.7,
          fontWeight: '400'
        }}>
          {currentMessage.source}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="banner-dismiss"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            marginLeft: '10px'
          }}
          title="Dismiss"
        >
          ×
        </button>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.2)',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.5)',
            animation: `bannerProgress ${currentMessage.duration || 8000}ms linear`,
            transformOrigin: 'left center'
          }} />
        </div>
      </div>

      <style>
        {`
          @keyframes bannerProgress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
          }
        `}
      </style>
    </>
  );
}

export default MessageBanner;
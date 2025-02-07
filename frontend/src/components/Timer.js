import React, { useState, useEffect, useRef } from 'react';

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((sec) => {
          if (sec === 0) {
            if (minutes === 0) {
              // Timer ended
              clearInterval(timerRef.current);
              setIsActive(false);
              return 0;
            } else {
              setMinutes((m) => m - 1);
              return 59;
            }
          } else {
            return sec - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, minutes]);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Pomodoro Timer</h3>
      <div style={{ fontSize: '2rem' }}>
        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
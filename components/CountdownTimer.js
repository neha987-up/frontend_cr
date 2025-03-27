import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [targetDate]);

  function getTimeRemaining(targetDate) {
    const total = Date.parse(targetDate) - Date.now();
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return {
      hours,
      minutes,
      seconds,
      total,
    };
  }

  if (timeLeft.total <= 0) {
    return <div>Time's up!</div>;
  }

  return (
    <div>
      <div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {timeLeft.hours} Hours
        </div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {timeLeft.minutes} Minutes
        </div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {timeLeft.seconds} Seconds
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

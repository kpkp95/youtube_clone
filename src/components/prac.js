import React, { useState, useEffect } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Mounting: Start a timer
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // Unmounting: Cleanup the timer
    return () => {
      clearInterval(timer);
      console.log("Timer cleared!");
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  return <div>Timer: {count} seconds</div>;
};

export default Timer;

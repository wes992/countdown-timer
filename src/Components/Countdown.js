import React, { useState, useEffect } from "react";
import { getTimeDifference } from "../utils/utils";

const Countdown = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState({});

  const endTimeMS = new Date(endTime).getTime();

  useEffect(() => {
    const time = setInterval(handleUpdateTime, 500);
    return () => clearInterval(time);
  }, []);

  const handleUpdateTime = () => {
    setRemainingTime(getTimeDifference(endTimeMS));
  };

  const { sec, min, hour, day } = remainingTime;

  return (
    <section className="coming-soon">
      <div>
        <h2>We're going on vacation!</h2>
        <div className="countdown">
          <div className="time-container">
            <h3 className="time-value">{day}</h3>
            <h3 className="time-description">Day</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">{hour}</h3>
            <h3 className="time-description">Hour</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">{min}</h3>
            <h3 className="time-description">Minute</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">{sec}</h3>
            <h3 className="time-description">Second</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Countdown };

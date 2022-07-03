import React from "react";

const Countdown = () => {
  return (
    <section className="coming-soon">
      <div>
        <h2>We are opening soon</h2>
        <div className="countdown">
          <div className="time-container">
            <h3 className="time-value">Time</h3>
            <h3 className="time-description">Day</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">Time</h3>
            <h3 className="time-description">Hour</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">Time</h3>
            <h3 className="time-description">Minute</h3>
          </div>
          <div className="time-container">
            <h3 className="time-value">Time</h3>
            <h3 className="time-description">Second</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Countdown };

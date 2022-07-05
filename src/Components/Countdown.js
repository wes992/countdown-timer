import { Button, Collapse, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getTimeDifference } from "../utils/utils";

const Countdown = ({ timer, handleClose }) => {
  const { open, title, date: endTime } = timer;
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
    <Grid
      item
      border="1px solid gray"
      alignItems="center"
      justifyContent="center"
      p={2}
      xs={12}
      sm={5}
      borderRadius={2}
    >
      <Button variant="text" align="left" onClick={handleClose}>
        ^
      </Button>
      <Typography variant="h2">{title}</Typography>
      <Grid container px={3} justifyContent="space-around" textAlign="center">
        <div className="time-container">
          <Typography variant="h3" className="time-value">
            {day}
          </Typography>
          <Typography className="time-description">Day</Typography>
        </div>
        <div className="time-container">
          <Typography variant="h3" className="time-value">
            {hour}
          </Typography>
          <Typography className="time-description">Hour</Typography>
        </div>
        <div className="time-container">
          <Typography variant="h3" className="time-value">
            {min}
          </Typography>
          <Typography className="time-description">Minute</Typography>
        </div>
        <div className="time-container">
          <Typography variant="h3" className="time-value">
            {sec}
          </Typography>
          <Typography className="time-description">Second</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export { Countdown };

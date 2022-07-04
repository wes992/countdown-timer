import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getTimeDifference } from "../utils/utils";

const Countdown = ({ title, endTime }) => {
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
    <Grid container alignItems="center" justifyContent="center">
      <div>
        <Typography variant="h2">{title}</Typography>
        <Box className="countdown">
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
        </Box>
      </div>
    </Grid>
  );
};

export { Countdown };

import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  getCountdownProgress,
  getFinishedText,
  getTimeDifference,
} from "../utils/utils";
import Cup from "./Cup";

const Countdown = ({ countdown, onDelete }) => {
  const { title, endDate } = countdown;
  const [remainingTime, setRemainingTime] = useState({});
  const [finishedText, setFinishedText] = useState("");

  const endTimeMS = new Date(endDate).getTime();

  useEffect(() => {
    const time = setInterval(handleUpdateTime, 500);
    setFinishedText(getFinishedText());
    return () => clearInterval(time);
  }, []);

  const handleUpdateTime = () => {
    setRemainingTime(getTimeDifference(endTimeMS));
  };

  const { sec, min, hour, day } = remainingTime;

  const getCountdownContent = () => {
    if (sec === 0 && min === 0 && hour === 0 && day === 0) {
      return (
        <Grid
          container
          px={3}
          direction="column"
          alignItems={"center"}
          textAlign="center"
        >
          <Typography variant="h3">{finishedText}</Typography>
          <Cup progress={100} />
        </Grid>
      );
    }

    return (
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
        <Cup progress={getCountdownProgress(countdown)} />
      </Grid>
    );
  };

  return (
    <Grid item border="1px solid gray" p={2} xs={12} borderRadius={2}>
      <Button variant="text" onClick={() => onDelete(countdown.id)}>
        x
      </Button>
      <Typography variant="h2">{title}</Typography>
      {getCountdownContent()}
    </Grid>
  );
};

export { Countdown };

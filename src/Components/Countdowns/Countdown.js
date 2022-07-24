import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCountdownContext } from "../../Context/countdownContext";
import { useFirebase } from "../../firebase";
import {
  getBackgroundImage,
  getCountdownProgress,
  getFinishedText,
  getTimeDifference,
} from "../../utils/utils";
import Cup from "../Cup";

const Countdown = () => {
  const { deleteDataFromCollection, getDataInCollection } = useFirebase();
  const {
    selectedCountdown,
    setSelectedCountdown,
    setCountdowns,
    setMenuOpen,
  } = useCountdownContext();
  const { id, title = "", endDate = "" } = selectedCountdown;
  const [remainingTime, setRemainingTime] = useState({});
  const [finishedText, setFinishedText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const endTimeMS = new Date(endDate).getTime();

  useEffect(() => {
    const time = setInterval(handleUpdateTime, 500);
    setFinishedText(getFinishedText());
    setBackgroundImage(getBackgroundImage());
    return () => clearInterval(time);
  }, [selectedCountdown]);

  const handleUpdateTime = () => {
    setRemainingTime(getTimeDifference(endTimeMS));
  };

  const { sec, min, hour, day } = remainingTime;

  const handleDelete = async (id) => {
    try {
      await deleteDataFromCollection("countdowns", id);
      const result = await getDataInCollection("countdowns");
      const results = result.data.map((r) => ({
        ...r,
        endDate: r.endDate.toDate(),
        createdAt: r.createdAt.toDate(),
      }));
      setCountdowns(results);
      setSelectedCountdown({});
    } catch (err) {
      console.error(err);
    } finally {
      setMenuOpen(true);
    }
  };

  if (!selectedCountdown.id) return;

  if (sec === 0 && min === 0 && hour === 0 && day === 0) {
    return (
      <Grid
        container
        xs={12}
        height={"100vh"}
        justifyContent={"center"}
        alignItems="center"
        sx={{ backgroundImage: backgroundImage }}
      >
        <Grid
          container
          justifyContent="space-around"
          textAlign="center"
          color="white"
          backgroundColor="rgba(0,0,0,.5)"
          ml="60px"
        >
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"center"}
              alignItems="center"
              item
              xs={12}
            >
              <Grid item>
                <Typography variant="h2">{title}</Typography>
              </Grid>
              <Grid item>
                <Button variant="text" onClick={() => handleDelete(id)}>
                  x
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h3">{finishedText}</Typography>
          </Grid>
          <Cup progress={100} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      xs={12}
      height={"100vh"}
      justifyContent={"center"}
      alignItems="center"
      sx={{ backgroundImage: backgroundImage }}
    >
      <Grid
        container
        // px={3}
        justifyContent="space-around"
        textAlign="center"
        color="white"
        backgroundColor="rgba(0,0,0,.5)"
        ml={"60px"}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          item
          xs={12}
        >
          <Grid item>
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={() => handleDelete(id)}>
              x
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h3" className="time-value">
            {day}
          </Typography>
          <Typography className="time-description">Day</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" className="time-value">
            {hour}
          </Typography>
          <Typography className="time-description">Hour</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" className="time-value">
            {min}
          </Typography>
          <Typography className="time-description">Minute</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" className="time-value">
            {sec}
          </Typography>
          <Typography className="time-description">Second</Typography>
        </Grid>
        {/* <Cup progress={getCountdownProgress(selectedCountdown)} /> */}
      </Grid>
    </Grid>
  );
};

export { Countdown };

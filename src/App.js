import { useState } from "react";
import "./App.css";
import { Countdown } from "./Components";
import { AddNew } from "./Components/AddNew";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { v4 } from "uuid";
import { Button, Grid } from "@mui/material";
function App() {
  const [timers, setTimers] = useState([
    {
      id: 1,
      title: "Daddy's bday!",
      date: "2022-07-04T14:44:57-05:00",
      open: false,
    },
    { id: 2, title: "Mama's bday!", date: "December 17, 2022", open: false },
    { id: 3, title: "We in Disney!", date: "December 3, 2022", open: true },
  ]);

  const handleAdd = (info) => {
    setTimers([...timers, { ...info, id: v4() }]);
  };

  const handleOpenTimer = (timerId) => {
    setTimers((timers) =>
      timers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, open: true };
        }
        return timer;
      })
    );
  };

  const handleCloseTimer = (timerId) => {
    setTimers((timers) =>
      timers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, open: false };
        }
        return timer;
      })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <AddNew addCountdown={handleAdd} />
        <Grid container gap={2} justifyContent="center">
          {timers.map((timer) =>
            timer.open ? (
              <Countdown
                key={timer.id}
                timer={timer}
                handleClose={() => handleCloseTimer(timer.id)}
              />
            ) : (
              <Button
                key={timer.id}
                variant="text"
                color="primary"
                onClick={() => handleOpenTimer(timer.id)}
              >
                v
              </Button>
            )
          )}
        </Grid>
      </div>
    </LocalizationProvider>
  );
}

export default App;

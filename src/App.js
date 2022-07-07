import { useState } from "react";
import "./App.css";
import { Countdown } from "./Components";
import { AddNew } from "./Components/AddNew";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { v4 } from "uuid";
import { Grid } from "@mui/material";
import { Collapsible } from "./Components/Collapsible";
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
    setTimers([...timers, { ...info, id: v4(), createdAt: Date.now() }]);
  };

  const handleDelete = (id) => {
    setTimers((timers) => timers.filter((timer) => timer.id !== id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <AddNew addCountdown={handleAdd} />
        <Grid container gap={2} justifyContent="center">
          {timers.map((timer) => (
            <Collapsible
              key={timer.id}
              buttonTexts={{ open: `Open ${timer.title}`, closed: "close" }}
              defaultOpen={timer.open}
            >
              <Countdown timer={timer} onDelete={handleDelete} />
            </Collapsible>
          ))}
        </Grid>
      </div>
    </LocalizationProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Countdown } from "./Components";
import { AddNew } from "./Components/AddNew";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { v4 } from "uuid";
import { Grid } from "@mui/material";
import { Collapsible } from "./Components/Collapsible";
import { addDataToCollection, getDataInCollection } from "./firebase/firebase";
function App() {
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    const data = Promise.resolve(getDataInCollection("countdowns"));
    data.then((_data) => {
      setCountdowns(
        _data.map((d) => ({
          ...d,
          endDate: d.endDate.toDate(),
        }))
      );
    });
  }, []);

  const handleAdd = (info) => {
    const addedItem = { ...info, id: v4(), createdAt: new Date() };
    addDataToCollection("countdowns", addedItem);
    setCountdowns([...countdowns, addedItem]);
  };

  const handleDelete = (id) => {
    setCountdowns((countdowns) =>
      countdowns.filter((countdown) => countdown.id !== id)
    );
  };

  if (!countdowns.length) return "Loading...";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <AddNew addCountdown={handleAdd} />
        <Grid container gap={2} justifyContent="center">
          {countdowns.map((countdown) => (
            <Collapsible
              key={countdown.id}
              buttonTexts={{ open: `Open ${countdown.title}`, closed: "close" }}
              defaultOpen={countdown.open}
            >
              <Countdown countdown={countdown} onDelete={handleDelete} />
            </Collapsible>
          ))}
        </Grid>
      </div>
    </LocalizationProvider>
  );
}

export default App;

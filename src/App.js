import { useEffect, useState } from "react";
import "./App.css";
import { Countdown } from "./Components";
import { AddNew } from "./Components/AddNew";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Grid } from "@mui/material";
import { Collapsible } from "./Components/Collapsible";
import {
  addDataToCollection,
  deleteDataFromCollection,
  getDataInCollection,
} from "./firebase/firebase";
function App() {
  const [countdowns, setCountdowns] = useState([]);
  const [shouldClose, setShouldClose] = useState(false);

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
    setShouldClose(false);
  }, []);

  const handleAdd = (addedItem) => {
    // const addedItem = { ...info, id: v4(), createdAt: new Date() };
    // const result = await addDataToCollection("countdowns", addedItem);

    // console.log("result", result);
    // if (result.success) {
    //   setShouldClose(true);
    // }
    setCountdowns([...countdowns, addedItem]);
  };

  const handleDelete = (id) => {
    deleteDataFromCollection("countdowns", id);
    setCountdowns((countdowns) =>
      countdowns.filter((countdown) => countdown.id !== id)
    );
  };

  // if (!countdowns.length) return "Loading...";
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <AddNew shouldClose={shouldClose} addCountdown={handleAdd} />
        <Grid container gap={2} justifyContent="center">
          {countdowns.map((countdown) => (
            <Collapsible
              key={countdown.id}
              buttonTexts={{ open: `Open ${countdown.title}`, closed: "close" }}
              defaultOpen
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

import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Menu } from "./Components/Menu/Menu";
import { CountdownContextProvider } from "./Context/countdownContext";
import { Countdown } from "./Components/Countdowns";
import { Grid } from "@mui/material";
import { getBackgroundImage } from "./utils/utils";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CountdownContextProvider>
        {/* <div className="App"> */}
        <Grid
          container
          sx={{ height: "100vh", backgroundImage: getBackgroundImage() }}
        >
          <Menu />
          <Countdown />
        </Grid>
        {/* </div> */}
      </CountdownContextProvider>
    </LocalizationProvider>
  );
}

export default App;

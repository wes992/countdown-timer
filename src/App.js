import "./App.css";
import { Countdown } from "./Components";

function App() {
  return (
    <div className="App">
      <Countdown endTime={"December 17, 2022"} />
    </div>
  );
}

export default App;

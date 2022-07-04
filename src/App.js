import { useState } from "react";
import "./App.css";
import { Countdown } from "./Components";

function App() {
  const [timers, setTimers] = useState([
    { id: 1, title: "Daddy's bday!", date: "September 20, 2022" },
    { id: 2, title: "Mama's bday!", date: "December 17, 2022" },
    { id: 3, title: "We in Disney!", date: "December 3, 2022" },
  ]);

  return (
    <div className="App">
      {timers.map((timer) => (
        <Countdown key={timer.id} title={timer.title} endTime={timer.date} />
      ))}
    </div>
  );
}

export default App;

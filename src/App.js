import React, { useEffect, useState } from "react";
import "./App.css";

import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";
import { ICAScrambo } from "icascrambo/dist/ICAScrambo";
import Settings from "./components/Settings";

const scrambler = new ICAScrambo();

function App() {
  const [recordedTimes, setRecordedTimes] = useState([]);
  const [scramble, setScramble] = useState("");
  const [wcaEvent, setWcaEvent] = React.useState("333");

  function updateScramble() {
    if (typeof window.puzzles === "undefined") {
      setTimeout(updateScramble, 200);
      return;
    }
    setScramble(window.puzzles[wcaEvent].generateScramble());
  }

  useEffect(() => {
    // Probably first render
    if (typeof window.puzzles === "undefined") {
      // No need for timeout at first render
      updateScramble();
    } else {
      setTimeout(updateScramble, 200);
    }
  }, [recordedTimes, wcaEvent]);

  return (
    <div className="App">
      {scramble}
      <Stopwatch
        recordedTimes={recordedTimes}
        setRecordedTimes={setRecordedTimes}
        setScramble={setScramble}
      />
      <Times recordedTimes={recordedTimes} />

      <Settings setWcaEvent={setWcaEvent} />
    </div>
  );
}

export default App;

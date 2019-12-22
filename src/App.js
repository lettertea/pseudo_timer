import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
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
  const [tnoodleScrambler, setTnoodleScrambler] = useState();
  const [selectedPuzzleType, setSelectedPuzzleType] = useState("333");

  useEffect(() => {
    function checkVariable() {
      if (typeof window.puzzles !== "undefined") {
        setTnoodleScrambler(window.puzzles);
        console.log(window.puzzles);
      } else {
        setTimeout(checkVariable, 200);
      }
    }
    checkVariable();
  }, []);

  // useEffect(() => {
  //
  //
  //   setScramble(scrambler.get()[0].scramble_string);
  // }, [recordedTimes]);

  return (
    <div className="App">
      {typeof tnoodleScrambler !== "undefined"
        ? tnoodleScrambler[wcaEvent].generateScramble()
        : "Nat"}

      <Stopwatch
        recordedTimes={recordedTimes}
        setRecordedTimes={setRecordedTimes}
      />
      <Times recordedTimes={recordedTimes} />

      <Settings setWcaEvent={setWcaEvent} />
    </div>
  );
}

export default App;

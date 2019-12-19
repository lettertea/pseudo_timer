import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";
import {ICAScrambo} from "icascrambo/dist/ICAScrambo";

const scrambler = new ICAScrambo();

function App() {

  const [recordedTimes, setRecordedTimes] = useState([]);
  const [scramble, setScramble] = useState("");

  useEffect(() => {
    setScramble(scrambler.get()[0].scramble_string);
  }, [recordedTimes]);

  return (
    <div className="App">
      {scramble}
      <Stopwatch recordedTimes={recordedTimes} setRecordedTimes={setRecordedTimes}/>
      <Times recordedTimes={recordedTimes}/>
    </div>
  );
}

export default App;

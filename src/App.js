import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";

function App() {
  const [recordedTimes, setRecordedTimes] = useState([]);
  return (
    <div className="App">
      <Stopwatch recordedTimes = {recordedTimes} setRecordedTimes = {setRecordedTimes}/>
      <Times recordedTimes = {recordedTimes}  />
    </div>
  );
}

export default App;

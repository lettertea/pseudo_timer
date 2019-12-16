import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Stopwatch from "./components/Stopwatch";
import Times from "./components/Times";

function App() {
  const [recordedTime, setRecordedTime] = useState(-1);
  return (
    <div className="App">
      <Stopwatch setRecordedTime = {setRecordedTime}/>
      <Times recordedTime = {recordedTime}  />
    </div>
  );
}

export default App;

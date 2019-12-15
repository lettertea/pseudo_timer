import React, {useEffect, useState, useRef} from "react";

function Stopwatch() {
  const [runningTime, setRunningTime] = useState(0);
  // Refs are used to prevent retrieving stale states for key event handlers
  // More info: https://reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
  const isHoldingSpaceAtStop = useRef(false);
  const isTiming = useRef(false);

  let timer;

  function handleOnKeyUp(e) {
    if (e.key === " ") {
      if (!isTiming.current && !isHoldingSpaceAtStop.current) {
        const startTime = Date.now();
        timer = setInterval(() => {
          setRunningTime(Date.now() - startTime)
        }, 10);
        isTiming.current = true
      }
      // Prevents stopwatch from starting again after finishing
      isHoldingSpaceAtStop.current = false;

    }
  }


  function handleKeyDown(e) {
    if (e.key === " ") {
      if (isTiming.current) {
        console.log("Hi");
        clearInterval(timer);
        isTiming.current = false;
        isHoldingSpaceAtStop.current = true;
      }
    }
  }

  function displayStopwatch() {
    const minutes = Math.trunc(runningTime / 60000);
    let seconds = Math.trunc(runningTime / 1000) % 60;
    let centiseconds = Math.trunc(runningTime / 10) % 100;

    // Add leading zeros
    centiseconds = ("0" + centiseconds).substr(-2);
    if (minutes > 0 && seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes === 0 ? `${seconds}.${centiseconds}` : `${minutes}:${seconds}.${centiseconds}`;
  }

  useEffect(() => {
    document.body.onkeyup = handleOnKeyUp;
    document.body.onkeypress = handleKeyDown;
  }, []);

  useEffect(() => {
    return () => {
      clearInterval()
    };
  }, []);

  return (
    <div>
      <p>{displayStopwatch()}</p>
    </div>
  );
}


export default Stopwatch;
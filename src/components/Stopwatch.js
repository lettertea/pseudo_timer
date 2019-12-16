import React, {useEffect, useRef, useState} from "react";

function Stopwatch(props) {
  const [runningTime, setRunningTime] = useState(0);

  // Ref allows access to fresh state from event handlers
  let refRunningTime = useRef(runningTime);
  useEffect(() => {
    refRunningTime.current = runningTime;
  }, [runningTime]);

  let isHoldingSpaceAtStop = false;
  let isTiming = false;
  let timer;

  function handleOnKeyUp(e) {
    e.preventDefault()
    if (e.key === " ") {
      if (!isTiming && !isHoldingSpaceAtStop) {
        const startTime = Date.now();
        timer = setInterval(() => {
          setRunningTime(Date.now() - startTime)
        }, 10);
        isTiming = true
      } else {
        // Prevents stopwatch from starting again after finishing
        isHoldingSpaceAtStop = false;
      }
    }
  }


  function handleKeyDown(e) {
    e.preventDefault()
    if (e.key === " ") {
      if (isTiming) {
        clearInterval(timer);
        isTiming = false;
        isHoldingSpaceAtStop = true;

        props.setRecordedTime(displayStopwatch(refRunningTime.current));
      }
    }
  }

  function displayStopwatch(totalMilliseconds = runningTime) {
    const minutes = Math.trunc(totalMilliseconds / 60000);
    let seconds = Math.trunc(totalMilliseconds / 1000) % 60;
    let centiseconds = Math.trunc(totalMilliseconds / 10) % 100;

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


  return (
    <div>
      <p>{displayStopwatch()}</p>
    </div>
  );
}


export default Stopwatch;
import React, {useEffect, useState} from 'react';

function Time(props) {
  return (<li>{props.time}</li>);
}

function Times(props) {

  const [times, setTimes] = useState([]);


  useEffect(() => {
    // Checks against -1 to avoid inserting the initial value on component mount
    if (props.recordedTime !== -1) {
      setTimes([props.recordedTime, ...times]);
    }
  }, [props.recordedTime])


  return (
    <ul>
      {times.map((time, index) => <Time key={index} time={time}/>)}
    </ul>
  );


}

export default Times;
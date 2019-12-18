import React, {useEffect, useState} from 'react';

function Time(props) {
  return (<li>{props.time}</li>);
}

function Times(props) {


  return (
    <ul>
      {props.recordedTimes.map((time, index) => <Time key={index} time={time}/>)}
    </ul>
  );


}

export default Times;
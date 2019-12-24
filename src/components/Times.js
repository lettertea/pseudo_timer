import React from "react";

function Time(props) {
  return <li>{props.time}</li>;
}

function Times(props) {
  const times = [];

  if (typeof props.recordedTimes !== "undefined") {
    for (let i = props.recordedTimes.length - 1; i >= 0; --i) {
      times.push(<Time key={i} time={props.recordedTimes[i]} />);
    }
  }

  return <ul>{times}</ul>;
}

export default Times;

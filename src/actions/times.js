import msToTime from "../msToTime";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const addTime = milliseconds => (dispatch, getState) => {
  const state = getState();

  // Create eventTimesCopy with just timeInMilliseconds added for now to do average calculations
  let eventTimesCopy = state.times[state.wcaEvent] ? [{timeInMilliseconds: milliseconds}, ...state.times[state.wcaEvent]] : [];

  const timeDetails = {
    solveNumber: eventTimesCopy.length,
    timeInMilliseconds: milliseconds,
    time: msToTime(milliseconds),
    date: new Date().toLocaleString("en-us"),
    "3of5": eventTimesCopy.length >= 5
      ? msToTime(eventTimesCopy.slice(0, 5).sort((a, b) => a.timeInMilliseconds - b.timeInMilliseconds)
        .slice(1, 4).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao3: eventTimesCopy.length >= 3 ? msToTime(eventTimesCopy.slice(0, 3).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao12: eventTimesCopy.length >= 12 ? msToTime(eventTimesCopy.slice(0, 12).reduce((a, b) => a + b.timeInMilliseconds, 0) / 12) : "",
    scramble: (
      <Tooltip title={<Typography>{state.scramble}</Typography>} interactive placement="top">
        <Button>Hover</Button>
      </Tooltip>
    )
  };

  if (eventTimesCopy.length === 0) {
    eventTimesCopy = [timeDetails]
  } else {
    eventTimesCopy[0] = timeDetails;
  }

  const updatedTimes = {...state.times, [state.wcaEvent]: eventTimesCopy};

  localStorage.setItem("times", JSON.stringify(updatedTimes));
  dispatch({
    type: "ADD_TIME",
    times: updatedTimes
  });


};

export const setTimes = times => {
  return {
    type: "SET_TIMES",
    times: times
  };
};
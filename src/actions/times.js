import msToTime from "../msToTime";
import Tooltip from "@material-ui/core/Tooltip";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const addTime = milliseconds => (dispatch, getState) => {
  const state = getState();
  let newTimes = state.times[state.wcaEvent] ? [{timeInMilliseconds: milliseconds}, ...state.times[state.wcaEvent]] : [];

  const timeDetails = {
    solveNumber: newTimes.length,
    timeInMilliseconds: milliseconds,
    time: msToTime(milliseconds),
    date: new Date().toLocaleString("en-us"),
    "3of5": newTimes.length >= 5
      ? msToTime(newTimes.slice(0,5).sort((a, b) => a.timeInMilliseconds - b.timeInMilliseconds)
        .slice(1, 4).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao3: newTimes.length >= 3 ? msToTime(newTimes.slice(0,3).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao12: newTimes.length >= 12 ? msToTime(newTimes.slice(0,12).reduce((a, b) => a + b.timeInMilliseconds, 0) / 12) : "",
    scramble:  (
      <Tooltip title={<Typography>{state.scramble}</Typography>} interactive placement="top">
        <Button>Hover</Button>
      </Tooltip>
    )
  };

  if (newTimes.length === 0) {
    newTimes = [timeDetails]
  } else {
    newTimes[0] = timeDetails;
  }

  dispatch({
    type: "ADD_TIME",
    times: {...state.times, [state.wcaEvent]: newTimes}
  });
};

export const setTimes = times => {
  return {
    type: "SET_TIMES",
    times: times
  };
};
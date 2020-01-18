import msToTime from "../msToTime";
import React from "react";

export const addTime = milliseconds => (dispatch, getState) => {
  const state = getState();

  // Create eventTimesCopy with just timeInMilliseconds added for now to do average calculations
  let eventTimesCopy = state.times[state.wcaEvent] ? [{timeInMilliseconds: milliseconds}, ...state.times[state.wcaEvent]] : [];

  const timeDetails = {
    solveNumber: eventTimesCopy.length || 1,
    timeInMilliseconds: milliseconds,
    time: msToTime(milliseconds),
    date: new Date().toLocaleString("en-us"),
    "3of5": eventTimesCopy.length >= 5
      ? msToTime(eventTimesCopy.slice(0, 5).sort((a, b) => a.timeInMilliseconds - b.timeInMilliseconds)
        .slice(1, 4).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao3: eventTimesCopy.length >= 3 ? msToTime(eventTimesCopy.slice(0, 3).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao12: eventTimesCopy.length >= 12 ? msToTime(eventTimesCopy.slice(0, 12).reduce((a, b) => a + b.timeInMilliseconds, 0) / 12) : "",
    scramble: state.scramble
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
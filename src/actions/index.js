import msToTime from "../msToTime";
import React from "react";

export const setSvgScale = svgScale => {
  return {
    type: "SET_SVG_SCALE",
    svgScale: svgScale
  };
};

export const updateScramble = (generateCurrentAndNext = false) => {
  return function innerUpdateScramble(dispatch, getState) {
    if (typeof window.puzzles === "undefined") {
      setTimeout(() => innerUpdateScramble(dispatch, getState), 200);
      return;
    }

    const state = getState();

    // The empty string marks that it's invalid and that the scramble does not have a cache
    const scrambleCache = generateCurrentAndNext ? "" : state.scrambleCache;
    if (!scrambleCache) {
      dispatch({
        type: "UPDATE_SCRAMBLE",
        scramble: "Loading Scramble"
      });
    }

    // 333oh uses the same scramble algorithm as 333
    let parsedWcaEvent = state.wcaEvent === "333oh" ? "333" : state.wcaEvent;

    dispatch({
      type: "UPDATE_SCRAMBLE",
      scramble: scrambleCache ? scrambleCache : window.puzzles[parsedWcaEvent].generateScramble()
    });

    // Use timeouts to allow some UI rendering between calls
    setTimeout(() => {
      dispatch({
        type: "UPDATE_SCRAMBLE_CACHE",
        scrambleCache: window.puzzles[parsedWcaEvent].generateScramble()
      });
    }, 200);
  };
};

export const setWcaEvent = wcaEvent => {
  return {
    type: "SET_WCA_EVENT",
    wcaEvent: wcaEvent
  };
};

export const addTime = milliseconds => (dispatch, getState) => {
  const state = getState();
  const timesCopy = {...state.times};
  const eventTimesForCalculatingAverages = timesCopy[state.wcaEvent] ? [...timesCopy[state.wcaEvent], {timeInMilliseconds: milliseconds}] : [];
  const lastIndex = eventTimesForCalculatingAverages.length - 1;

  const timeDetails = {
    timeInMilliseconds: milliseconds,
    time: msToTime(milliseconds),
    scramble: state.scramble,
    date: new Date().toLocaleString("en-us"),
    "3of5": lastIndex >= 4
      ? msToTime(eventTimesForCalculatingAverages.slice(lastIndex - 4, lastIndex + 1).sort((a, b) => a.timeInMilliseconds - b.timeInMilliseconds)
        .slice(1, 4).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao3: lastIndex >= 2 ? msToTime(eventTimesForCalculatingAverages.slice(lastIndex - 2, lastIndex + 1).reduce((a, b) => a + b.timeInMilliseconds, 0) / 3) : "",
    ao12: lastIndex >= 11 ? msToTime(eventTimesForCalculatingAverages.slice(lastIndex - 11, lastIndex + 1).reduce((a, b) => a + b.timeInMilliseconds, 0) / 12) : ""
  };

  if (timesCopy[state.wcaEvent]) {
    timesCopy[state.wcaEvent].push(timeDetails);
  } else {
    timesCopy[state.wcaEvent] = [timeDetails];
  }

  localStorage.setItem("times", JSON.stringify(timesCopy));
  dispatch({
    type: "ADD_TIME",
    times: timesCopy
  });
};

export const setTimes = times => {
  return {
    type: "SET_TIMES",
    times: times
  };
};
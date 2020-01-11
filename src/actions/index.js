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
    });
  };
};

export const setWcaEvent = wcaEvent => {
  return {
    type: "SET_WCA_EVENT",
    wcaEvent: wcaEvent
  };
};

export const addTime = time => (dispatch, getState) => {
  const state = getState();
  const timeDetails = {
    time: time,
    scramble: state.scramble,
    date: new Date().toLocaleString("en-us")
  };
  const timesCopy = {...state.times};

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
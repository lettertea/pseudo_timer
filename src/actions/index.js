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
    const scrambleCache = generateCurrentAndNext ? "" : state.scrambleCache;
    if (!scrambleCache)
      dispatch({
        type: "UPDATE_SCRAMBLE",
        scramble: "Loading Scramble"
      });

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

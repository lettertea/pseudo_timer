import React from "react";

export * from "./times";

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

    // 333oh uses the same scramble algorithm as 333
    let parsedWcaEvent = state.settings.wcaEvent === "333oh" ? "333" : state.settings.wcaEvent;

    // The empty string marks that it's invalid and that the scramble does not have a cache
    const scrambleCache = generateCurrentAndNext ? "" : state.scrambleCache;

    if (!scrambleCache) {
      dispatch({
        type: "SET_SCRAMBLE",
        scramble: "Loading Scramble..."
      });

      setTimeout(() => {
        dispatch({
          type: "SET_SCRAMBLE",
          scramble: scrambleCache ? scrambleCache : window.puzzles[parsedWcaEvent].generateScramble()
        });
      },100)
    } else {
      dispatch({
        type: "SET_SCRAMBLE",
        scramble: scrambleCache ? scrambleCache : window.puzzles[parsedWcaEvent].generateScramble()
      });
    }


    // Use timeouts to allow some UI rendering between calls
    setTimeout(() => {
      dispatch({
        type: "SET_SCRAMBLE_CACHE",
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

export const setInspection = inspection => {
  return {
    type: "SET_INSPECTION",
    inspection: inspection
  };
};

export const setJudgeGender = judgeGender => {
  return {
    type: "SET_JUDGE_GENDER",
    judgeGender: judgeGender
  };
};

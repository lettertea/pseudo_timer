export const wcaEvent = (state = "333", action) => {
  if (action.type === "SET_WCA_EVENT") {
    return action.wcaEvent;
  }
  return state;
};

export const judgeGender = (state = "Male", action) => {
  if (action.type === "SET_JUDGE_GENDER") {
    return action.judgeGender;
  }
  return state;
};

export const svgScale = (state = 2, action) => {
  if (action.type === "SET_SVG_SCALE") {
    return action.svgScale;
  }
  return state;
};

export const inspection = (
  state = {
    useInspection: true,
    eightSeconds: true,
    twelveSeconds: true,
    inspectionBegins: false
  },
  action
) => {
  if (action.type === "SET_INSPECTION") {
    return action.inspection;
  }
  return state;
};


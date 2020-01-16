const INITIAL_STATE = {
  useInspection: true,
  eightSeconds: true,
  twelveSeconds: true,
  inspectionBegins: false,
}

const inspection = (state = INITIAL_STATE, action) => {
  if (action.type === "SET_INSPECTION") {
    return action.inspection;
  }
  return state;
};
export default inspection;

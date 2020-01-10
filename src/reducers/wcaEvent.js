const wcaEvent = (state = "333", action) => {
  if (action.type === "SET_WCA_EVENT") {
    return action.wcaEvent;
  }
  return state;
};
export default wcaEvent;

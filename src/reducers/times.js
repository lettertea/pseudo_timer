const times = (state = 0, action) => {
  if (action.type === "ADD_TIME" || action.type === "SET_TIMES") {
    return action.times;
  }
  return state;
};
export default times;

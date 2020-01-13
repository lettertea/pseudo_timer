const scramble = (state = "Loading Scramble...", action) => {
  if (action.type === "SET_SCRAMBLE") {
    return action.scramble;
  }
  return state;
};
export default scramble;

const scrambleCache = (state = "", action) => {
  if (action.type === "SET_SCRAMBLE_CACHE") {
    return action.scrambleCache;
  }
  return state;
};
export default scrambleCache;

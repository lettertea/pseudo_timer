const scrambleCache = (state = "", action) => {
  if (action.type === "UPDATE_SCRAMBLE_CACHE") {
    return action.scrambleCache;
  }
  return state;
};
export default scrambleCache;

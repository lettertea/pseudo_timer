const svgScale = (state = 2, action) => {
  if (action.type === "SET_SVG_SCALE") {
    return action.svgScale;
  }
  return state;
};
export default svgScale;

const settings = (state = 2, action) => {
  switch (action.type) {
    case 'SET_SVG_SCALE':
      return action.svgScale
    default:
      return state
  }
}
export default settings
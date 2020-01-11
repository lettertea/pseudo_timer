import { combineReducers } from 'redux'
import svgScale from './svgScale'
import wcaEvent from "./wcaEvent";
import scramble from "./scramble";
import scrambleCache from "./scrambleCache";
import times from "./times";

export default combineReducers({
  svgScale,
  wcaEvent,
  scramble,
  scrambleCache,
  times
})
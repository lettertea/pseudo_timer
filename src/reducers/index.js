import { combineReducers } from 'redux'
import scramble from "./scramble";
import scrambleCache from "./scrambleCache";
import times from "./times";
import {inspection, judgeGender, svgScale, wcaEvent} from "./settings";

export default combineReducers({
  svgScale,
  wcaEvent,
  judgeGender,
  inspection,
  scramble,
  scrambleCache,
  times,
})
import {combineReducers} from 'redux'
import scramble from "./scramble";
import scrambleCache from "./scrambleCache";
import times from "./times";
import settings from "./settings";

export default combineReducers({
  settings,
  scramble,
  scrambleCache,
  times,
})
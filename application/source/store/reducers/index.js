import { combineReducers } from "redux";

import error from "./error";
import profile from "./profile";
import note from "./notes";

export default combineReducers({
  error,
  profile,
  note,
});

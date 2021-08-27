import { combineReducers } from "redux";

import user from "./user";
import settings from "./settings";
import notifications from "./notification";
import dialogs from "./dialogs";
import geoarticle from "./geoarticle";
export default combineReducers({
  user,
  settings,
  notifications,
  dialogs,
  geoarticle,
});

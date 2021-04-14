import "bootstrap/dist/css/bootstrap.css";
import { combineReducers } from "redux";
import exerciseReducer from "./exerciseReducer";
import notificationReducer from "./notificationReducer";
import routineReducer from "./routineReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  exercises: exerciseReducer,
  form: formReducer,
  notification: notificationReducer,
  routines: routineReducer,
});

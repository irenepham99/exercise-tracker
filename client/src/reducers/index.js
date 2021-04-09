import "bootstrap/dist/css/bootstrap.css";
import { combineReducers } from "redux";
import exerciseReducer from "./exerciseReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  exercises: exerciseReducer,
  form: formReducer,
});

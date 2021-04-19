import {
  GET_ROUTINE,
  GET_ROUTINES,
  CREATE_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_ROUTINE,
} from "../actions/routineActions";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ROUTINES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case GET_ROUTINE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_ROUTINE:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_ROUTINE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_ROUTINE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

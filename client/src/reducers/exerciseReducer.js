import {
  GET_EXERCISE,
  GET_EXERCISES,
  CREATE_EXERCISE,
  DELETE_EXERCISE,
  UPDATE_EXERCISE,
} from "../actions";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_EXERCISES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case GET_EXERCISE:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_EXERCISE:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_EXERCISE:
      return { ...state, [action.payload.id]: action.payload }; //finds the id and assigns it to the payload
    case DELETE_EXERCISE:
      return _.omit(state, action.payload); //the id of the deletd object
    default:
      return state;
  }
};

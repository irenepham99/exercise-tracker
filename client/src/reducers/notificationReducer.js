import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "../actions";

export default (
  state = { open: false, message: "", severity: "success" },
  action
) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return { open: true, ...action.payload };
    case CLOSE_NOTIFICATION:
      return { ...state, open: false };
    default:
      return state;
  }
};

export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";
export const OPEN_NOTIFICATION = "OPEN_NOTIFICATION";

export const handleError = (error, dispatch) => {
  if (error.response == undefined || !error.response.status) {
    dispatch(openNotification("Network Error", "error"));
  } else {
    dispatch(
      openNotification(
        `Error: ${error.response.status} ${error.response.data.message}`,
        "error"
      )
    );
  }
};

export const openNotification = (message, severity) => {
  return { type: OPEN_NOTIFICATION, payload: { message, severity } };
};

//thunk calls the function with dispatch
export const closeNotification = () => (dispatch) => {
  dispatch({ type: CLOSE_NOTIFICATION, payload: "" });
};

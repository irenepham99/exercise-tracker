import exerciseApi from "../apis/exerciseApi";
import history from "../history";

export const GET_EXERCISE = "GET_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";

export const GET_EXERCISE_LOG = "GET_EXERCISE_LOG";

export const GET_ROUTINE = "GET_ROUTINE";
export const GET_ROUTINES = "GET_ROUTINES";
export const CREATE_ROUTINE = "CREATE_ROUTINE";
export const DELETE_ROUTINE = "DELETE_ROUTINE";
export const UPDATE_ROUTINE = "UPDATE_ROUTINE";

export const LOG_EXERCISE = "LOG_EXERCISE";
export const CLOSE_NOTIFICATION = "CLOSE_NOTIFICATION";
export const OPEN_NOTIFICATION = "OPEN_NOTIFICATION";

export const getRoutines = () => async (dispatch) => {
  const response = await exerciseApi.get("/routine");
  dispatch({ type: GET_ROUTINES, payload: response.data });
};

export const createRoutine = (formValues) => async (dispatch) => {
  const response = await exerciseApi.post("/routine", { ...formValues });
  dispatch({ type: CREATE_ROUTINE, payload: response.data });
  dispatch(openNotification("Routine created successfully", "success"));
  history.push("/routine");
};

export const deleteRoutine = (id) => async (dispatch) => {
  await exerciseApi.delete(`/routine/${id}`);
  dispatch({ type: DELETE_ROUTINE, payload: id });
  dispatch(openNotification("Routine deleted successfully", "success"));
};

export const getRoutine = (id) => async (dispatch) => {
  const response = await exerciseApi.get(`/routine/${id}`);
  dispatch({ type: GET_ROUTINE, payload: response.data });
};

export const updateRoutine = (formValues, id) => async (dispatch) => {
  console.log("update routine");
  const response = await exerciseApi.patch(`/routine/${id}`, formValues);
  dispatch({ type: UPDATE_ROUTINE, payload: response.data });
  dispatch(openNotification("Update successful", "success"));
  history.push("/");
};

export const openNotification = (message, severity) => {
  return { type: OPEN_NOTIFICATION, payload: { message, severity } };
};

//thunk calls the function with dispatch
export const closeNotification = () => (dispatch) => {
  dispatch({ type: CLOSE_NOTIFICATION, payload: "" });
};

//this function returns a function
export const getExercises = () => async (dispatch) => {
  const response = await exerciseApi.get("/exercise");
  dispatch({ type: GET_EXERCISES, payload: response.data });
};

export const getExercise = (id) => async (dispatch) => {
  const response = await exerciseApi.get(`/exercise/${id}`);
  dispatch({ type: GET_EXERCISE, payload: response.data });
};

export const updateExercise = (formValues, id) => async (dispatch) => {
  const response = await exerciseApi.patch(`/exercise/${id}`, formValues);
  dispatch({ type: UPDATE_EXERCISE, payload: response.data });
  dispatch(openNotification("Update successful", "success"));
  history.push("/");
};

//TODO ERROR HANDLING
export const createExercise = (formValues) => async (dispatch) => {
  try {
    const response = await exerciseApi.post("/exercise", { ...formValues });
    dispatch({ type: CREATE_EXERCISE, payload: response.data });
    dispatch(openNotification("Exercise created successfully", "success"));
    history.push("/");
  } catch (error) {
    console.log(error.response);
  }
};

export const logExercise = (formValues, id) => async (dispatch) => {
  console.log(formValues, "formvalues log eercise");
  const response = await exerciseApi.post(`/exercise/${id}/log`, {
    ...formValues,
  });
  //TODO does anything need to happen?
  dispatch({ type: LOG_EXERCISE, payload: response.data });
  dispatch(openNotification("Log added successfully", "success"));
  history.push("/");
};

export const getExerciseLog = (id) => async (dispatch) => {
  const response = await exerciseApi.get(`/exercise/${id}/log`);
  dispatch({ type: GET_EXERCISE_LOG, payload: { data: response.data, id } });
};

export const deleteExercise = (id) => async (dispatch) => {
  console.log("delete exercise called", id);
  await exerciseApi.delete(`/exercise/${id}`);
  dispatch({ type: DELETE_EXERCISE, payload: id });
  dispatch(openNotification("Exercise deleted successfully", "success"));
};

// export const fetchPosts = () => {
//     //redux thunk calls the function with dispatch and getState
//     return async (dispatch, getState) => {
//         const response = await jsonPlaceholder.get('/posts')
//         dispatch( {
//             type: 'FETCH_POSTS',
//             payload: response
//         });
//     }
// };

//action creators must return a plain JS object
//need to use redux thunk to make redux wait for the async api request

//review async await and promises!
//dispatch action --> middleware --> reducers
//middlewares are js functions that stop or modify actions
//redux thunk allows the acetion to return a function and it will call it for you
//we manually dispatch the action

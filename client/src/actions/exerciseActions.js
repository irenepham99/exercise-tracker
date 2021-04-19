import exerciseApi from "../apis/exerciseApi";
import history from "../history";
import { handleError, openNotification } from "./index";

export const GET_EXERCISE = "GET_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";
export const GET_EXERCISE_LOG = "GET_EXERCISE_LOG";
export const LOG_EXERCISE = "LOG_EXERCISE";

export const getExercises = () => async (dispatch) => {
  try {
    const response = await exerciseApi.get("/exercise");
    dispatch({ type: GET_EXERCISES, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const getExercise = (id) => async (dispatch) => {
  try {
    const response = await exerciseApi.get(`/exercise/${id}`);
    dispatch({ type: GET_EXERCISE, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const updateExercise = (formValues, id) => async (dispatch) => {
  try {
    const response = await exerciseApi.patch(`/exercise/${id}`, formValues);
    dispatch({ type: UPDATE_EXERCISE, payload: response.data });
    dispatch(openNotification("Update successful", "success"));
    history.push("/");
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const createExercise = (formValues) => async (dispatch) => {
  try {
    const response = await exerciseApi.post("/exercise", { ...formValues });
    dispatch({ type: CREATE_EXERCISE, payload: response.data });
    dispatch(openNotification("Exercise created successfully", "success"));
    history.push("/");
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const logExercise = (formValues, id) => async (dispatch) => {
  try {
    const response = await exerciseApi.post(`/exercise/${id}/log`, {
      ...formValues,
    });
    dispatch({ type: LOG_EXERCISE, payload: response.data });
    dispatch(openNotification("Log added successfully", "success"));
    history.push("/");
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const getExerciseLog = (id) => async (dispatch) => {
  const response = await exerciseApi.get(`/exercise/${id}/log`);
  dispatch({ type: GET_EXERCISE_LOG, payload: { data: response.data, id } });
};

export const deleteExercise = (id) => async (dispatch) => {
  try {
    await exerciseApi.delete(`/exercise/${id}`);
    dispatch({ type: DELETE_EXERCISE, payload: id });
    dispatch(openNotification("Exercise deleted successfully", "success"));
  } catch (error) {
    handleError(error);
  }
};

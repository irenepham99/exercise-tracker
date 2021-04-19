import exerciseApi from "../apis/exerciseApi";
import history from "../history";
import { openNotification, handleError } from "./index";

export const GET_ROUTINE = "GET_ROUTINE";
export const GET_ROUTINES = "GET_ROUTINES";
export const CREATE_ROUTINE = "CREATE_ROUTINE";
export const DELETE_ROUTINE = "DELETE_ROUTINE";
export const UPDATE_ROUTINE = "UPDATE_ROUTINE";

export const getRoutines = () => async (dispatch) => {
  try {
    const response = await exerciseApi.get("/routine");
    dispatch({ type: GET_ROUTINES, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const createRoutine = (formValues) => async (dispatch) => {
  try {
    const response = await exerciseApi.post("/routine", { ...formValues });
    dispatch({ type: CREATE_ROUTINE, payload: response.data });
    dispatch(openNotification("Routine created successfully", "success"));
    history.push("/routine");
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const deleteRoutine = (id) => async (dispatch) => {
  try {
    await exerciseApi.delete(`/routine/${id}`);
    dispatch({ type: DELETE_ROUTINE, payload: id });
    dispatch(openNotification("Routine deleted successfully", "success"));
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const getRoutine = (id) => async (dispatch) => {
  try {
    const response = await exerciseApi.get(`/routine/${id}`);
    dispatch({ type: GET_ROUTINE, payload: response.data });
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const updateRoutine = (formValues, id) => async (dispatch) => {
  try {
    const response = await exerciseApi.patch(`/routine/${id}`, formValues);
    dispatch({ type: UPDATE_ROUTINE, payload: response.data });
    dispatch(openNotification("Update successful", "success"));
    history.push("/");
  } catch (error) {
    handleError(error, dispatch);
  }
};

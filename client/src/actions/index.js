import exerciseApi from "../apis/exerciseApi";
import history from "../history";

export const GET_EXERCISE = "GET_EXERCISE";
export const GET_EXERCISES = "GET_EXERCISES";
export const CREATE_EXERCISE = "CREATE_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";

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
  dispatch({ type: GET_EXERCISE, payload: response.data });
  history.push("/");
};

export const createExercise = (formValues) => async (dispatch) => {
  const response = await exerciseApi.post("/exercise", { ...formValues });
  dispatch({ type: CREATE_EXERCISE, payload: response.data });
  history.push("/");
};

export const deleteExercise = (id) => async (dispatch) => {
  console.log("delete exercise called", id);
  await exerciseApi.delete(`/exercise/${id}`);
  dispatch({ type: DELETE_EXERCISE, payload: id });
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

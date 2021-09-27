import { streamsAPI } from '../../apis/streamsAPI';
import history from '../../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from '../actionTypes';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// CRUD operations

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth; // Grab the userId from the auth state in Redux store

  const response = await streamsAPI.post('/streams', {...formValues, userId}); // Add userId to formValues object so that we know who created the stream based on userId

  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });

  // Programmatic navigation
  // Get user back to the root route
  history.push('/')
};

export const fetchStreams = () => async dispatch => {
  const response = await streamsAPI.get('/streams');

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = id => async dispatch => {
  const response = await streamsAPI.get(`/streams/${id}`);

  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streamsAPI.patch(`/streams/${id}`, formValues);

  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });

  // Programmatic navigation
  // Get user back to the root route
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streamsAPI.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });

  // Programmatic navigation
  // Get user back to the root route
  history.push('/');
};

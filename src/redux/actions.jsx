import {ADD_FAVOURITE, REMOVE_FAVOURITE} from './actionTypes';

export const addToFavourite = data => ({
  type: ADD_FAVOURITE,
  payload: data,
});

export const removeFromFavourite = index => ({
  type: REMOVE_FAVOURITE,
  payload: index,
});

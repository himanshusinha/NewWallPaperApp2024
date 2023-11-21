import {ADD_FAVOURITE, CHANGE_THEME, REMOVE_FAVOURITE} from './actionTypes';

export const addToFavourite = data => ({
  type: ADD_FAVOURITE,
  payload: data,
});

export const removeFromFavourite = index => ({
  type: REMOVE_FAVOURITE,
  payload: index,
});
export const changeTheme = type => ({
  type: CHANGE_THEME,
  payload: type,
});

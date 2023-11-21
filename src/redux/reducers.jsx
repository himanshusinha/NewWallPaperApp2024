import {ADD_FAVOURITE, CHANGE_THEME, REMOVE_FAVOURITE} from './actionTypes';

export const reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      // Check if the item is already in the favorites list
      const isAlreadyInFavorites = state.some(
        item => item.id === action.payload.id,
      );

      // If not present, add it to favorites
      if (!isAlreadyInFavorites) {
        return [...state, action.payload];
      }
      // If already in favorites, return the current state
      return state;

    case REMOVE_FAVOURITE:
      const deleteArray = state.filter((item, index) => {
        return index !== action.payload;
      });
      return deleteArray;

    default:
      return state;
  }
};

export const themeReducers = (state = false, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
};

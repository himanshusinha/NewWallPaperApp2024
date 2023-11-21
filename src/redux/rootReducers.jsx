import {combineReducers} from 'redux';
import {reducers, themeReducers} from './reducers';

const rootReducer = combineReducers({
  reducers: reducers,
  themeReducers: themeReducers,
});

export default rootReducer;

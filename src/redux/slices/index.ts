import { combineReducers } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';

const rootReducer = combineReducers({
  session: sessionReducer,
  // Agrega aquí otros reducers cuando los tengas
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

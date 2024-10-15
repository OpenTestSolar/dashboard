import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import global from './global';
import user from './user';
import listTestImage from './list/testImage';
import listTestTask from './list/testTask';
import listTestRecord from './list/testRecord';
import listTools from './list/testTool';

const reducer = combineReducers({
  global,
  user,
  listSelect: listTestImage,
  listTask: listTestTask,
  listRecord: listTestRecord,
  listTools,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

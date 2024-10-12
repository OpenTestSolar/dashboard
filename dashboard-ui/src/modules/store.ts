import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import global from './global';
import user from './user';
import listTestImage from './list/testImage';
import listTestTask from './list/testTask';
import listTestRecord from './list/testRecord';


const reducer = combineReducers({
  global,
  user,
  listSelect: listTestImage,
  listTask: listTestTask,
  listRecord: listTestRecord,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

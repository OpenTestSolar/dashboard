import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTestTaskList, ITestTask } from 'services/testTask';

const namespace = 'list/task';

interface IInitialState {
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  testTaskList: ITestTask[];
}

const initialState: IInitialState = {
  loading: true,
  current: 1,
  pageSize: 10,
  total: 0,
  testTaskList: [],
};

export const getList = createAsyncThunk(
  `${namespace}/getTestTaskList`,
  async (params: { pageSize: number; current: number }) => {
    const result = await getTestTaskList(params);
    return {
      list: result?.list,
      total: result?.total,
      pageSize: params.pageSize,
      current: params.current,
    };
  },
);

const listTestTaskSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    clearPageState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.testTaskList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPageState } = listTestTaskSlice.actions;

export const selectTestTaskList = (state: RootState) => state.listTask;

export default listTestTaskSlice.reducer;

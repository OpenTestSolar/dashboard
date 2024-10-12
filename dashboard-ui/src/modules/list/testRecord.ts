import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTestRecordList, ITestRecord } from 'services/testRecord';

const namespace = 'list/record';

interface IInitialState {
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  testRecordList: ITestRecord[];
}

const initialState: IInitialState = {
  loading: true,
  current: 1,
  pageSize: 10,
  total: 0,
  testRecordList: [],
};

export const getList = createAsyncThunk(
  `${namespace}/getTestRecordList`,
  async (params: { pageSize: number; current: number }) => {
    const result = await getTestRecordList(params);
    return {
      list: result?.list,
      total: result?.total,
      pageSize: params.pageSize,
      current: params.current,
    };
  },
);

const listTestRecordSlice = createSlice({
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
        state.testRecordList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPageState } = listTestRecordSlice.actions;

export const selectTestRecordList = (state: RootState) => state.listRecord;

export default listTestRecordSlice.reducer;

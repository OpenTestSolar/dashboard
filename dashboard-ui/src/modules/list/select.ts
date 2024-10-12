import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTestImageList, ITestImage } from 'services/testImage';

const namespace = 'list/image';

interface IInitialState {
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  testImageList: ITestImage[];
}

const initialState: IInitialState = {
  loading: true,
  current: 1,
  pageSize: 10,
  total: 0,
  testImageList: [],
};

export const getList = createAsyncThunk(
  `${namespace}/getTestImageList`,
  async (params: { pageSize: number; current: number }) => {
    const result = await getTestImageList(params);
    return {
      list: result?.list,
      total: result?.total,
      pageSize: params.pageSize,
      current: params.current,
    };
  },
);

const listSelectSlice = createSlice({
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
        state.testImageList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearPageState } = listSelectSlice.actions;

export const selectTestImageList = (state: RootState) => state.listSelect;

export default listSelectSlice.reducer;

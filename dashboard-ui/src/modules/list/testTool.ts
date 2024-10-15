import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getTestToolList, TestToolInfo } from 'services/testTool';

const namespace = 'list/tools';

interface IInitialState {
  loading: boolean;
  toolList: TestToolInfo[];
}

const initialState: IInitialState = {
  loading: true,
  toolList: [],
};

export const getToolList = createAsyncThunk(`${namespace}/getToolList`, async () => {
  const result = await getTestToolList();
  return {
    list: result,
  };
});

const listToolSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    clearPageState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToolList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToolList.fulfilled, (state, action) => {
        state.loading = false;
        state.toolList = action.payload?.list;
      })
      .addCase(getToolList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectToolList = (state: RootState) => state.listTools;

export default listToolSlice.reducer;

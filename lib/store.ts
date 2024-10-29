import { configureStore } from '@reduxjs/toolkit';

// import global from './global';
import { testImagesApiSlice } from './testImage/testImageSlice';
import { testRecordsApiSlice } from './testRecord/testRecordSlice';
import { testTasksApiSlice } from './testTask/testTaskSlice';
import { testToolsApiSlice } from './testTool/testToolSlice';

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: {
      [testImagesApiSlice.reducerPath]: testImagesApiSlice.reducer,
      [testRecordsApiSlice.reducerPath]: testRecordsApiSlice.reducer,
      [testTasksApiSlice.reducerPath]: testTasksApiSlice.reducer,
      [testToolsApiSlice.reducerPath]: testToolsApiSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        testImagesApiSlice.middleware,
        testRecordsApiSlice.middleware,
        testTasksApiSlice.middleware,
        testToolsApiSlice.middleware,
      );
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TestToolInfo {
  name: string;
  nameZh: string;
  description: string;
}

interface TestToolMetaInfo {
  tools: Array<TestToolInfo>;
}

// Define a service using a base URL and expected endpoints
export const testToolsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://proxy.cors.sh/https://testsolar-1321258242.cos.ap-guangzhou.myqcloud.com/testtools',
  }),
  reducerPath: 'testToolsApi',
  tagTypes: ['testTools'],
  endpoints: (build) => ({
    getTestTools: build.query<TestToolMetaInfo, any>({
      query: () => `stable.index.json`,
    }),
  }),
});

export const { useGetTestToolsQuery } = testToolsApiSlice;

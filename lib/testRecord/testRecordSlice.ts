import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogObj, Logger } from 'tslog';

interface TestTask {
  id: bigint;
  taskName: string;
}

interface TestRecord {
  id: bigint;
  taskName: string;
  triggerFrom: TestTask;
  status: string;
  startTime: Date;
  elapse: number;
  passRate: number;
  caseCount: bigint;
}

interface TestRecordApiResponse {
  records: TestRecord[];
  total: number;
  pageSize: number;
  current: number;
}

const log: Logger<ILogObj> = new Logger();

// Define a service using a base URL and expected endpoints
export const testRecordsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/mockData' }),
  reducerPath: 'testRecordApi',
  tagTypes: ['testRecords'],
  endpoints: (build) => ({
    getTaskRecords: build.query<TestRecordApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => {
        log.debug(`current use mock data only, limit=${limit}, page=${page}`);
        return 'records.json';
      },
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testRecords', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
      transformResponse: (response: any) => {
        // 检查返回的数据结构
        log.info(response);
        return response; // 确保你返回了处理后的数据
      },
    }),
  }),
});

export const { useGetTaskRecordsQuery } = testRecordsApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogObj, Logger } from 'tslog';

interface TestTask {
  id: bigint;
  taskName: string;
  creator: string;
  modifyTime: Date;
}

interface TestTaskApiResponse {
  tasks: TestTask[];
  total: number;
  pageSize: number;
  current: number;
}

const log: Logger<ILogObj> = new Logger();

// Define a service using a base URL and expected endpoints
export const testTasksApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/mockData' }),
  reducerPath: 'testTaskApi',
  tagTypes: ['testTasks'],
  endpoints: (build) => ({
    getTaskTasks: build.query<TestTaskApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => {
        log.debug(`current use mock data only, limit=${limit}, page=${page}`);
        return 'tasks.json';
      },
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testTasks', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
      transformResponse: (response: any) => {
        // 检查返回的数据结构
        log.info(response);
        return response; // 确保你返回了处理后的数据
      },
    }),
  }),
});

export const { useGetTaskTasksQuery } = testTasksApiSlice;

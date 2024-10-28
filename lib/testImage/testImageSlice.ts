import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Logger, ILogObj } from 'tslog';

export interface TestImage {
  id: number;
  imageName: string;
  user: string;
  count: number;
}

export interface TestImageApiResponse {
  images: TestImage[];
  total: number;
  pageSize: number;
  current: number;
}

const log: Logger<ILogObj> = new Logger();

// Define a service using a base URL and expected endpoints
export const testImagesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  reducerPath: 'testImageApi',
  tagTypes: ['testImages'],
  endpoints: (build) => ({
    getTestImages: build.query<TestImageApiResponse, { limit?: number; page?: number }>({
      query: ({ limit = 20, page = 1 }) => {
        log.debug(`current use mock data only, limit=${limit}, page=${page}`);
        return 'api/images';
      },
      providesTags: (result, error, { limit, page }) =>
        result ? [{ type: 'testImages', id: `PAGE_${page}_LIMIT_${limit}` }] : [],
      transformResponse: (response: any) => {
        log.info(response);
        return response;
      },
    }),
  }),
});

// Hooks are auto-generated by RTK-Query
// Same as `quotesApiSlice.endpoints.getQuotes.useQuery`
export const { useGetTestImagesQuery } = testImagesApiSlice;
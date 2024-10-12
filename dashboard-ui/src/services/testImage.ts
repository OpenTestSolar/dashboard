import request from 'utils/request';

export interface ITestImage {
  id: bigint;
  imageName: string;
  user: string;
  count: bigint;
}

interface IResult {
  list: ITestImage[];
}

interface IParams {
  pageSize: number;
  current: number;
}

export const getTestImageList = async (params: IParams) => {
  const result = await request.get<IResult>('/api/get-test-images');

  // 模拟接口分页
  let list = result?.data?.list || [];
  const total = list.length;
  list = list.splice(params.pageSize * (params.current - 1), params.pageSize);
  return {
    list,
    total,
  };
};

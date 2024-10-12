import request from 'utils/request';

export interface ITestTask {
  id: bigint;
  taskName: string;
  creator: string;
  modifyTime: Date;
}

interface IResult {
  list: ITestTask[];
}

interface IParams {
  pageSize: number;
  current: number;
}

export const getTestTaskList = async (params: IParams) => {
  const result = await request.get<IResult>('/api/get-test-tasks');

  // 模拟接口分页
  let list = result?.data?.list || [];
  const total = list.length;
  list = list.splice(params.pageSize * (params.current - 1), params.pageSize);
  return {
    list,
    total,
  };
};

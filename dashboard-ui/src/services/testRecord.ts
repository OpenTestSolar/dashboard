import request from 'utils/request';

export interface ITestTask {
  id: bigint;
  taskName: string;
}

export interface ITestRecord {
  id: bigint;
  taskName: string;
  triggerFrom: ITestTask;
  status: string;
  startTime: Date;
  elapse: number;
  passRate: number;
  caseCount: bigint;
}

interface IResult {
  list: ITestRecord[];
}

interface IParams {
  pageSize: number;
  current: number;
}

export const getTestRecordList = async (params: IParams) => {
  const result = await request.get<IResult>('/api/get-test-records');

  // 模拟接口分页
  let list = result?.data?.list || [];
  const total = list.length;
  list = list.splice(params.pageSize * (params.current - 1), params.pageSize);
  return {
    list,
    total,
  };
};

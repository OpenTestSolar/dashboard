import request from 'utils/request';

export interface IContract {
  id: bigint;
  imageName: string;
  user: string;
  count: bigint;
}

interface IResult {
  list: IContract[];
}

interface IParams {
  pageSize: number;
  current: number;
}

export const getContractList = async (params: IParams) => {
  const result = await request.get<IResult>('/api/get-list');

  // 模拟接口分页
  let list = result?.data?.list || [];
  const total = list.length;
  list = list.splice(params.pageSize * (params.current - 1), params.pageSize);
  return {
    list,
    total,
  };
};

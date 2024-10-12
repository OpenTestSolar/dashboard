import axios from 'axios';
import proxy from '../configs/host';
import MockAdapter from 'axios-mock-adapter';

const env = import.meta.env.MODE || 'development';
const API_HOST = proxy[env].API;

const SUCCESS_CODE = 0;
const TIMEOUT = 5000;

export const instance = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  withCredentials: true,
});

const mock = new MockAdapter(instance);
mock.onGet('/api/get-test-images').reply(200, {
  code: 0,
  data: {
    list: [
      {
        index: 1,
        imageName: 'tcr.tencent.cloud.com/party/taas/native/demo',
        count: 5,
        user: 'pinhenzhang',
      },
      {
        index: 2,
        imageName: 'tcr.tencent.cloud.com/party/taas/fastly',
        count: 2,
        user: 'zixindeng',
      },
      {
        index: 3,
        imageName: 'tcr.tencent.cloud.com/party/taas/pytest',
        count: 7,
        user: 'marklei',
      },
    ],
  },
});
mock.onGet('/api/get-test-tasks').reply(200, {
  code: 0,
  data: {
    list: [
      {
        id: 1277648,
        taskName: 'TestSolar Dashboard E2E 自动化测试（定时验收）',
        creator: 'pinhenzhang',
        modifyTime: '2024-09-19 15:22:34',
      },
      {
        id: 2095352,
        taskName: 'NAT测试(IPv6-广州)',
        imageName: 'tcr.tencent.cloud.com/party/taas/fastly',
        creator: 'zixindeng',
        modifyTime: '2024-09-23 11:05:22',
      },
      {
        id: 666666666,
        taskName: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
        creator: 'pinhenzhang',
        modifyTime: '2024-09-19 15:22:34',
      },
    ],
  },
});
mock.onGet('/api/get-test-records').reply(200, {
  code: 0,
  data: {
    list: [
      {
        id: 1277393,
        taskName: 'TestSolar Dashboard E2E 自动化测试（定时验收）',
        triggerFrom: {
          id: 12,
          taskName: 'Dashboard测试',
        },
        status: "success",
        startTime: '2024-09-19 15:22:34',
        elapse: 12331,
        passRate: 0.72,
      },
      {
        id: 1277394,
        taskName: 'NAT测试(IPv6-广州)',
        triggerFrom: {
          id: 12,
          taskName: 'NAT测试',
        },
        status: "running",
        startTime: '2024-09-19 15:22:34',
        elapse: 345,
        passRate: 0.72,
      },
      {
        id: 1277395,
        taskName: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
        triggerFrom: {
          id: 12,
          taskName: 'AI评估',
        },
        status: "success",
        startTime: '2024-09-19 15:22:34',
        elapse: 521,
        passRate: 0.72,
      },
      {
        id: 1277396,
        taskName: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
        triggerFrom: {
          id: 12,
          taskName: 'AI评估',
        },
        status: "error",
        startTime: '2024-09-19 15:22:34',
        elapse: 960,
        passRate: 0.72,
      },
      {
        id: 1277397,
        taskName: 'AI评估测试-(OpenAI/混元/千问/Claude/Gemini)',
        triggerFrom: {
          id: 12,
          taskName: 'AI评估',
        },
        status: "cancel",
        startTime: '2024-09-19 15:22:34',
        elapse: 3286,
        passRate: 0.72,
      },
    ],
  },
});

instance.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      if (data.code === SUCCESS_CODE) {
        return data;
      }
      return Promise.reject(data);
    }
    return Promise.reject(response?.data);
  },
  (e) => Promise.reject(e),
);

export default instance;

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

const mock = new MockAdapter(instance)
mock.onGet("/api/get-test-images").reply(200, {
  code: 0,
  data: {
    list: [
      {
        index: 1,
        imageName: "tcr.tencent.cloud.com/party/taas/native/demo",
        count: 5,
        user: "pinhenzhang",
      },
      {
        index: 2,
        imageName: "tcr.tencent.cloud.com/party/taas/fastly",
        count: 2,
        user: "zixindeng",
      },
      {
        index: 3,
        imageName: "tcr.tencent.cloud.com/party/taas/pytest",
        count: 7,
        user: "marklei",
      }
    ]
  }
})

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

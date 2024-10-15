export interface TestToolInfo {
  name: string;
  nameZh: string;
  description: string;
}

interface TestToolMetaInfo {
  tools: Array<TestToolInfo>;
}

export const getTestToolList = async () => {
  const response = await fetch(
    'https://proxy.cors.sh/https://testsolar-1321258242.cos.ap-guangzhou.myqcloud.com/testtools/stable.index.json',
  );
  const data: TestToolMetaInfo = await response.json();
  return data.tools;
};

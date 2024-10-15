import { memo, useEffect, useState } from 'react';
import { Input, Form, Select, InputNumber, InputNumberValue, SelectOption, Button, Space } from 'tdesign-react';

import './index.module.less';
import classnames from 'classnames';
import CommonStyle from '../../styles/common.module.less';
import TooltipLabel from './components/TooltipLabel';
import EnvEditor from './components/EnvEditor';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { selectToolList, getToolList } from 'modules/list/testTool';

const { FormItem } = Form;

export const NewTask = () => {
  const [value, setValue] = useState<SelectOption>('');
  const onChange = (value: SelectOption) => {
    setValue(value);
  };

  // 并发设置
  const [concurrencyValue, setConcurrencyValue] = useState<InputNumberValue>(1);
  const onConcurrencyChange = (value: InputNumberValue) => {
    setConcurrencyValue(value);
  };

  // 重试次数设置
  const [retryCountValue, setRetryCountValue] = useState<InputNumberValue>(1);
  const onRetryCountChange = (value: InputNumberValue) => {
    setRetryCountValue(value);
  };

  // 工具下拉菜单
  const dispatch = useAppDispatch();
  const testToolState = useAppSelector(selectToolList);
  const { loading, toolList } = testToolState;

  useEffect(() => {
    if (toolList.length == 0) {
      dispatch(getToolList());
    }
  }, [dispatch, toolList.length]);

  // 将 tools 数据转换为 Select 组件所需的格式
  const options = toolList.map((tool) => ({
    label: tool.nameZh,
    value: tool.name,
  }));

  // 环境变量数据
  const [envDatas, setEnvDatas] = useState();

  return (
    <>
      <Form labelWidth={120} layout='vertical'>
        <FormItem label='任务名称' name='taskName'>
          <Input align='left' size='medium' status='default' maxlength={500} type='text' style={{ width: '200px' }} />
        </FormItem>

        <FormItem label={<TooltipLabel label='镜像库' tooltip='提示信息' />} name='testImage'>
          <Select
            style={{ width: '360px' }}
            onChange={onChange}
            clearable
            options={[
              { label: '架构云', value: '1', title: '架构云选项' },
              { label: '大数据', value: '2' },
              { label: '区块链', value: '3' },
            ]}
          />
        </FormItem>

        <FormItem label='选择用例' name='selectCase'>
          <Input placeholder='不输入默认执行全部用例' style={{ width: '600px' }} />
        </FormItem>

        <FormItem label='执行集群' name='cluster'>
          <Select
            style={{ width: '360px' }}
            clearable
            options={[
              { label: '架构云', value: '1', title: '架构云选项' },
              { label: '大数据', value: '2' },
              { label: '区块链', value: '3' },
            ]}
          />
        </FormItem>

        <FormItem label='并发数目' name='concurrency'>
          <InputNumber min={1} max={30} defaultValue={1} value={concurrencyValue} onChange={onConcurrencyChange} />
        </FormItem>

        <FormItem label='用例失败重跑次数' name='retryCount'>
          <InputNumber min={1} max={10} defaultValue={1} value={retryCountValue} onChange={onRetryCountChange} />
        </FormItem>

        <FormItem label='测试工具' name='toolName'>
          <Select style={{ width: '200px' }} clearable loading={loading} options={options} />
        </FormItem>

        <FormItem label='环境变量' name='envs'>
          <EnvEditor />
        </FormItem>
      </Form>

      <Space>
        <Button theme='primary'>提交</Button>
        <Button theme='default'>取消</Button>
      </Space>
    </>
  );
};

const newTaskPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <NewTask />
  </div>
);

export default memo(newTaskPage);

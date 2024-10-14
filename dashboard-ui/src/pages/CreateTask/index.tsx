import { memo, useState } from 'react';
import { Input, Form, Select, SelectOption } from 'tdesign-react';

import './index.module.less';
import classnames from 'classnames';
import CommonStyle from '../../styles/common.module.less';
import TooltipLabel from './components/TooltipLabel';

const { FormItem } = Form;

export const NewTask = () => {
  const [value, setValue] = useState('');
  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <Form layout='vertical'>
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

        <FormItem label='LabelC:' name='inputC'>
          <Input placeholder='请输入内容C' />
        </FormItem>

        <FormItem label='LabelD:' name='inputD'>
          <Input placeholder='请输入内容D' />
        </FormItem>
      </Form>
    </>
  );
};

const newTaskPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <NewTask />
  </div>
);

export default memo(newTaskPage);

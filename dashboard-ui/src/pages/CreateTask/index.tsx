import React, {memo} from 'react';

import './index.module.less';
import {Input} from "tdesign-react";


const newTask: React.FC = () => (
  <>
    <Input
      label="任务名称"
      align="left"
      status="default"
      tips="这是 tips 文本信息"
      type="text"
    />
  </>
);

export default memo(newTask);

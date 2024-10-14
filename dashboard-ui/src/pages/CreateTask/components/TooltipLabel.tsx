import React from 'react';
import { Tooltip } from 'tdesign-react';
import { HelpCircleIcon } from 'tdesign-icons-react';

interface TooltipProps {
  label: string;
  tooltip: string;
}

// 创建一个带提示信息的 Label 公共组件
const TooltipLabel: React.FC<TooltipProps> = ({ label, tooltip }) => (
  <span>
    {label}
    <Tooltip content={tooltip}>
      <HelpCircleIcon style={{ marginLeft: '5px', cursor: 'pointer' }} />
    </Tooltip>
  </span>
);

export default TooltipLabel;

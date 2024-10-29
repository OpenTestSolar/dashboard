// 用户切换项目菜单
import { memo, useState } from 'react';
import { Select, SelectValue } from 'tdesign-react';

export default memo(() => {
  const [value, setValue] = useState('');
  const onChange = (value: SelectValue) => {
    setValue(value.toString());
  };

  return (
    <Select
      autoWidth
      value={value}
      onChange={onChange}
      options={[
        { label: '架构云', value: '1' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
      ]}
    />
  );
});

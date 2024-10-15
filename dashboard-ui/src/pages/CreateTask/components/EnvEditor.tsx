import React, { useState } from 'react';
import { BaseTable, Input, Button, BaseTableCol } from 'tdesign-react';

interface EnvVariable {
  envName: string;
  envValue: string;
}

const EnvironmentEditor: React.FC = () => {
  const [envVariables, setEnvVariables] = useState<EnvVariable[]>([
    { envName: 'EXAMPLE_KEY_1', envValue: 'example_value_1' },
    { envName: 'EXAMPLE_KEY_2', envValue: 'example_value_2' },
  ]);

  const addVariable = () => {
    setEnvVariables([...envVariables, { envName: '', envValue: '' }]);
  };

  const removeVariable = (index: number) => {
    setEnvVariables(envVariables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: 'envName' | 'envValue', value: string) => {
    const newVariables = [...envVariables];
    newVariables[index][field] = value;
    setEnvVariables(newVariables);
  };

  const columns: Array<BaseTableCol<EnvVariable>> = [
    {
      title: '变量名',
      colKey: 'key',
      render: ({ row, rowIndex }) => (
        <Input
          value={row.envName}
          onChange={(value) => updateVariable(rowIndex, 'envName', value)}
          placeholder='变量名'
        />
      ),
    },
    {
      title: '变量值',
      colKey: 'value',
      render: ({ row, rowIndex }) => (
        <Input
          value={row.envValue}
          onChange={(value) => updateVariable(rowIndex, 'envValue', value)}
          placeholder='变量值'
        />
      ),
    },
    {
      title: '操作',
      colKey: 'actions',
      render: ({ rowIndex }) => (
        <Button theme='danger' onClick={() => removeVariable(rowIndex)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0px' }}>
        <div style={{ width: '30%' }}>变量名</div>
        <div style={{ width: '30%' }}>变量值</div>
        <div style={{ width: '30%' }}>操作</div>
      </div>
      <BaseTable
        rowKey='key'
        data={envVariables}
        columns={columns}
        bordered={false}
        showHeader={false}
        disableDataPage={true}
      />
      <Button onClick={addVariable} style={{ marginBottom: '20px' }}>
        添加变量
      </Button>
    </div>
  );
};

export default EnvironmentEditor;

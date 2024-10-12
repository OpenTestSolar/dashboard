import React, { memo, useEffect, useState } from 'react';
import { Button, Row, Table, Tag } from 'tdesign-react';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { clearPageState, getList, selectTestImageList } from 'modules/list/testImage';
import SearchForm from './components/SearchForm';

import './index.module.less';
import classnames from 'classnames';
import CommonStyle from '../../../styles/common.module.less';
import { AddIcon } from 'tdesign-icons-react';

export const SelectTable = () => {
  const dispatch = useAppDispatch();
  const pageState = useAppSelector(selectTestImageList);
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);
  const [visible, setVisible] = useState(false);
  const { loading, testImageList, current, pageSize, total } = pageState;

  useEffect(() => {
    dispatch(
      getList({
        pageSize: pageState.pageSize,
        current: pageState.current,
      }),
    );
    return () => {
      dispatch(clearPageState());
    };
  }, []);

  function onSelectChange(value: (string | number)[]) {
    setSelectedRowKeys(value);
  }

  function rehandleClickOp(record: any) {
    console.log(record);
  }

  return (
    <>
      <Row justify='start' style={{ marginBottom: '20px' }}>
        <SearchForm
          onSubmit={async (value) => {
            console.log(value);
          }}
          onCancel={() => {}}
        />
        <Button icon={<AddIcon />}>创建镜像库</Button>
      </Row>
      <Table
        loading={loading}
        data={testImageList}
        columns={[
          {
            title: '镜像库地址',
            fixed: 'left',
            align: 'left',
            ellipsis: true,
            colKey: 'imageName',
          },
          {
            title: '用户',
            colKey: 'user',
            width: 140,
          },
          {
            title: '个数',
            width: 140,
            ellipsis: true,
            colKey: 'count',
            cell({ row }) {
              return (
                <Tag theme='success' variant='light'>
                  {row.count.toString()}
                </Tag>
              );
            },
          },
          {
            align: 'left',
            fixed: 'right',
            width: 120,
            colKey: 'op',
            title: '操作',
            cell(record) {
              return (
                <>
                  <Button
                    theme='primary'
                    variant='text'
                    onClick={() => {
                      rehandleClickOp(record);
                    }}
                  >
                    编辑
                  </Button>
                </>
              );
            },
          },
        ]}
        rowKey='index'
        selectedRowKeys={selectedRowKeys}
        hover
        onSelectChange={onSelectChange}
        pagination={{
          pageSize,
          total,
          current,
          showJumper: true,
          onCurrentChange(current, pageInfo) {
            dispatch(
              getList({
                pageSize: pageInfo.pageSize,
                current: pageInfo.current,
              }),
            );
          },
          onPageSizeChange(size) {
            dispatch(
              getList({
                pageSize: size,
                current: 1,
              }),
            );
          },
        }}
      />
    </>
  );
};

const testImagePage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <SelectTable />
  </div>
);

export default memo(testImagePage);

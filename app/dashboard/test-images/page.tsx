'use client';

import { useGetTestImagesQuery } from '@/lib/testImage/testImageSlice';
import React, { useState } from 'react';
import { Button, Row, Table, Tag } from 'tdesign-react';
import { ILogObj, Logger } from 'tslog';
import SearchForm, { FormValueType } from './components/SearchForm';

import CommonStyle from '@/app/styles/common.module.css';
import classnames from 'classnames';
import { AddIcon } from 'tdesign-icons-react';

const log: Logger<ILogObj> = new Logger();

const SelectTable = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const { data, error, isLoading } = useGetTestImagesQuery({ limit: pageSize, page: pageIndex });
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);

  log.info(`error is ${error}`);
  log.info(`data is ${data}`);

  const current = pageIndex;

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
          onSubmit={async (value: FormValueType) => {
            console.log(value);
          }}
          onCancel={() => {}}
        />
        <Button icon={<AddIcon />}>创建镜像库</Button>
      </Row>
      <Table
        loading={isLoading}
        data={data?.images || []}
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
          total: data?.total,
          current,
          showJumper: true,
          // onCurrentChange(current, pageInfo) {
          //   dispatch(
          //     getList({
          //       pageSize: pageInfo.pageSize,
          //       current: pageInfo.current,
          //     }),
          //   );
          // },
          // onPageSizeChange(size) {
          //   dispatch(
          //     getList({
          //       pageSize: size,
          //       current: 1,
          //     }),
          //   );
          // },
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

export default testImagePage;

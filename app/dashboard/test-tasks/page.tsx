'use client';

import { useGetTaskTasksQuery } from '@/lib/testTask/testTaskSlice';
import React, { memo, useState } from 'react';
import { Button, Row, Table, Tooltip } from 'tdesign-react';
import SearchForm, { FormValueType } from './components/SearchForm';

import CommonStyle from '@/app/styles/common.module.css';
import classnames from 'classnames';
import { useRouter } from 'next/navigation';
import { AddIcon, Edit1Icon, HistoryIcon, PlayCircleStrokeIcon } from 'tdesign-icons-react';
import { ILogObj, Logger } from 'tslog';

const log: Logger<ILogObj> = new Logger();

const TaskTable = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const { data, error, isLoading } = useGetTaskTasksQuery({ limit: pageSize, page: pageIndex });
  if (error) {
    log.warn(error);
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);
  const router = useRouter();

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
        <Button icon={<AddIcon />} onClick={() => router.push('/dashboard/new-task')}>
          创建测试任务
        </Button>
      </Row>
      <Table
        loading={isLoading}
        data={data?.tasks || []}
        columns={[
          {
            title: '任务ID',
            width: 120,
            fixed: 'left',
            align: 'left',
            ellipsis: true,
            colKey: 'id',
          },
          {
            title: '任务名称',
            colKey: 'taskName',
            fixed: 'left',
            align: 'left',
            ellipsis: true,
          },
          {
            title: '创建人',
            colKey: 'creator',
            width: 140,
          },
          {
            title: '最近修改时间',
            colKey: 'modifyTime',
            width: 200,
          },
          {
            align: 'left',
            fixed: 'right',
            width: 160,
            colKey: 'op',
            title: '操作',
            cell(record) {
              return (
                <>
                  <Tooltip content='启动'>
                    <Button
                      shape='circle'
                      icon={<PlayCircleStrokeIcon />}
                      onClick={() => {
                        rehandleClickOp(record);
                      }}
                    ></Button>
                  </Tooltip>

                  <Tooltip content='执行记录'>
                    <Button
                      shape='circle'
                      icon={<HistoryIcon />}
                      onClick={() => {
                        rehandleClickOp(record);
                      }}
                    ></Button>
                  </Tooltip>
                  <Tooltip content='编辑'>
                    <Button
                      shape='circle'
                      icon={<Edit1Icon />}
                      onClick={() => {
                        rehandleClickOp(record);
                      }}
                    ></Button>
                  </Tooltip>
                </>
              );
            },
          },
        ]}
        rowKey='index'
        selectedRowKeys={selectedRowKeys}
        hover
        onSelectChange={onSelectChange}
        // pagination={{
        //   pageSize,
        //   total,
        //   current,
        //   showJumper: true,
        //   onCurrentChange(current, pageInfo) {
        //     dispatch(
        //       getList({
        //         pageSize: pageInfo.pageSize,
        //         current: pageInfo.current,
        //       }),
        //     );
        //   },
        //   onPageSizeChange(size) {
        //     dispatch(
        //       getList({
        //         pageSize: size,
        //         current: 1,
        //       }),
        //     );
        //   },
        // }}
      />
    </>
  );
};

const selectPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <TaskTable />
  </div>
);

export default memo(selectPage);

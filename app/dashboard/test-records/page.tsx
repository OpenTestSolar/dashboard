'use client';

import prettyMilliseconds from 'pretty-ms';
import React, { memo, useState } from 'react';
import { Button, Progress, Select, StatusEnum, Table, Tag, Tooltip } from 'tdesign-react';
import { useGetTaskRecordsQuery } from '@/lib/testRecord/testRecordSlice';

import CommonStyle from '@/app/styles/common.module.css';
import classnames from 'classnames';
import { FilePasteIcon } from 'tdesign-icons-react';
import { ILogObj, Logger } from 'tslog';

const log: Logger<ILogObj> = new Logger();

const StatusMap: {
  [key: string]: React.ReactElement;
} = {
  success: (
    <Tag theme='success' variant='light'>
      已完成
    </Tag>
  ),
  error: (
    <Tag theme='danger' variant='light'>
      错误
    </Tag>
  ),
  running: (
    <Tag theme='primary' variant='light'>
      执行中
    </Tag>
  ),
  cancel: (
    <Tag theme='default' variant='light'>
      已取消
    </Tag>
  ),
};

const statusOptions = [
  { label: '已完成', value: 'success' },
  { label: '错误', value: 'error' },
  { label: '执行中', value: 'running' },
  { label: '已取消', value: 'cancel' },
];

const TestRecordsTable = () => {
  const pageSize = 20;
  const pageIndex = 1;
  const { data, error, isLoading } = useGetTaskRecordsQuery({ limit: pageSize, page: pageIndex });
  if (error) {
    log.warn(error);
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);

  function onSelectChange(value: (string | number)[]) {
    setSelectedRowKeys(value);
  }

  function rehandleClickOp(record: any) {
    console.log(record);
  }

  return (
    <>
      <Select multiple label='状态' autoWidth={true} options={statusOptions}></Select>
      <Table
        loading={isLoading}
        data={data?.records || []}
        columns={[
          {
            title: 'ID',
            width: 100,
            ellipsis: true,
            colKey: 'id',
          },
          {
            title: '测试任务名称',
            colKey: 'taskName',
            fixed: 'left',
            align: 'left',
            ellipsis: true,
          },
          {
            title: '启动方',
            colKey: 'creator',
            width: 140,
            cell({ row }) {
              // 返回一个超链接文本
              return (
                <a href={`/dashboard/tasks/${row.triggerFrom.id}`} target='_blank' rel='noopener noreferrer'>
                  {row.triggerFrom.taskName}
                </a>
              );
            },
          },
          {
            title: '状态',
            colKey: 'status',
            width: 120,
            cell({ row }) {
              return StatusMap[row.status];
            },
          },
          {
            title: '启动时间',
            colKey: 'startTime',
            width: 200,
          },
          {
            title: '耗时',
            colKey: 'elapse',
            width: 120,
            cell({ row }) {
              return prettyMilliseconds(row.elapse * 1000);
            },
          },
          {
            title: '通过率',
            colKey: 'passRate',
            width: 120,
            cell({ row }) {
              let finalStatus: StatusEnum = 'active';
              if (['success', 'running'].includes(row.status)) {
                finalStatus = 'success';
              } else if (row.status === 'cancel') {
                finalStatus = 'warning';
              } else if (row.status === 'error') {
                finalStatus = 'error';
              }

              return (
                <>
                  <Progress label percentage={row.passRate * 100} status={finalStatus} color=''></Progress>
                </>
              );
            },
          },
          {
            align: 'left',
            fixed: 'right',
            width: 80,
            colKey: 'op',
            title: '操作',
            cell(record) {
              return (
                <>
                  <Tooltip content='查看报告'>
                    <Button
                      shape='circle'
                      icon={<FilePasteIcon />}
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
      />
    </>
  );
};

const selectPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <TestRecordsTable />
  </div>
);

export default memo(selectPage);

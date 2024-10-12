import React, { memo, useEffect, useState } from 'react';
import { Button, Row, Table, Tag, Tooltip } from 'tdesign-react';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { clearPageState, getList, selectTestRecordList } from 'modules/list/testRecord';
import prettyMilliseconds from 'pretty-ms';

import './index.module.less';
import classnames from 'classnames';
import CommonStyle from '../../../styles/common.module.less';
import { AddIcon, FilePasteIcon } from 'tdesign-icons-react';

export const StatusMap: {
  [key: string]: React.ReactElement;
} = {
  "success": (
    <Tag theme='success' variant='light'>
      已完成
    </Tag>
  ),
  "error": (
    <Tag theme='danger' variant='light'>
      错误
    </Tag>
  ),
  "running": (
    <Tag theme='primary' variant='light'>
      执行中
    </Tag>
  ),
  "cancel": (
    <Tag theme='default' variant='light'>
      已取消
    </Tag>
  ),
};

export const SelectTable = () => {
  const dispatch = useAppDispatch();
  const pageState = useAppSelector(selectTestRecordList);
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([0, 1]);
  const [visible, setVisible] = useState(false);
  const { loading, testRecordList, current, pageSize, total } = pageState;

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
        <Button icon={<AddIcon />}>创建测试任务</Button>
      </Row>
      <Table
        loading={loading}
        data={testRecordList}
        columns={[
          {
            title: 'ID',
            width: 120,
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
            width: 120,
          },
          {
            title: '状态',
            colKey: 'status',
            width: 120,
            cell({row}) {
              return StatusMap[row.status]
            }
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
            cell({row}) {
              return prettyMilliseconds(row.elapse * 1000);
            }
          },
          {
            title: '通过率',
            colKey: 'passRate',
            width: 120,
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

const selectPage: React.FC = () => (
  <div className={classnames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
    <SelectTable />
  </div>
);

export default memo(selectPage);

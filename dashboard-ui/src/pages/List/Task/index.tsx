import React, { memo, useEffect, useState } from 'react';
import { Button, Row, Table, Tag, Tooltip } from 'tdesign-react';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { clearPageState, getList, selectTestImageList } from 'modules/list/select';
import SearchForm from './components/SearchForm';

import './index.module.less';
import classnames from 'classnames';
import CommonStyle from '../../../styles/common.module.less';
import { Edit1Icon, HistoryIcon, PlayCircleStrokeIcon } from 'tdesign-icons-react';

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
      </Row>
      <Table
        loading={loading}
        data={testImageList}
        columns={[
          {
            title: '任务ID',
            fixed: 'left',
            align: 'left',
            ellipsis: true,
            colKey: 'imageName',
          },
          {
            title: '任务名称',
            colKey: 'user',
            width: 140,
          },
          {
            title: '创建人',
            colKey: 'creator',
            width: 140,
          },
          {
            title: '最近修改时间',
            colKey: 'modifyTime',
            width: 140,
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
                  <Tooltip content="编辑">
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

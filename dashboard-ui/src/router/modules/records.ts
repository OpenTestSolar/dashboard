import { lazy } from 'react';
import { HistoryIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/records',
    meta: {
      title: '执行记录',
      Icon: HistoryIcon,
    },
    Component: lazy(() => import('pages/List/Record')),
  },
];

export default result;

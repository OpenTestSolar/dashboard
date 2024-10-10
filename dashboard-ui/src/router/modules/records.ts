import { lazy } from 'react';
import { QueueIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/records',
    meta: {
      title: '执行记录',
      Icon: QueueIcon,
    },
    Component: lazy(() => import('pages/List/Base')),
  },
];

export default result;

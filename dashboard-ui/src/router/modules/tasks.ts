import { lazy } from 'react';
import { QueueIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/tasks',
    meta: {
      title: '测试任务',
      Icon: QueueIcon,
    },
    Component: lazy(() => import('pages/List/Base')),
  },
];

export default result;

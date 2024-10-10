import { lazy } from 'react';
import { ViewModuleIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/list',
    meta: {
      title: '列表页',
      Icon: ViewModuleIcon,
    },
    children: [
      {
        path: 'base',
        Component: lazy(() => import('pages/List/Base')),
        meta: {
          title: '基础列表页',
        },
      },
      {
        path: 'select',
        Component: lazy(() => import('pages/List/Select')),
        meta: { title: '筛选列表页' },
      },
    ],
  },
];

export default result;
import { lazy } from 'react';
import { ViewModuleIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const images: IRouter[] = [
  {
    path: '/registry',
    meta: {
      title: '镜像库',
      Icon: ViewModuleIcon,
    },
    Component: lazy(() => import('pages/List/Select')),
  },
];

export default images;

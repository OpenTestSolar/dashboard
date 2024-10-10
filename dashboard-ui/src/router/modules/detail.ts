import { lazy } from 'react';
import { LayersIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/detail',
    meta: {
      title: '详情页',
      Icon: LayersIcon,
    },
    children: [

    ],
  },
];

export default result;

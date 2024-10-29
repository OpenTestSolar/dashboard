import React, { memo } from 'react';
import { Button } from 'tdesign-react';

import Image from 'next/image';

import Light403Icon from '@/public/svg/assets-result-403.svg';
import Light404Icon from '@/public/svg/assets-result-404.svg';
import Light500Icon from '@/public/svg/assets-result-500.svg';
import style from './index.module.less';

enum ECode {
  forbidden = 403,
  notFount = 404,
  error = 500,
}

interface IErrorPageProps {
  code: ECode;
  title?: string;
  desc?: string;
}

const errorInfo = {
  [ECode.forbidden]: {
    title: '403 Forbidden',
    desc: '抱歉，您无权限访问此页面',
    icon: <Image src={Light403Icon} alt='403' />,
  },
  [ECode.notFount]: {
    title: '404 Not Found',
    desc: '抱歉，您访问的页面不存在。',
    icon: <Image src={Light404Icon} alt='404' />,
  },
  [ECode.error]: {
    title: '500 Internal Server Error',
    desc: '抱歉，服务器出错啦！',
    icon: <Image src={Light500Icon} alt='500' />,
  },
};

const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const info = errorInfo[props.code];
  return (
    <div className={style.errorBox}>
      {info?.icon}
      <div className={style.title}>{info?.title}</div>
      <div className={style.description}>{info?.desc}</div>
      <Button theme='primary'>返回首页</Button>
    </div>
  );
};

export default memo(ErrorPage);

import React, { memo } from 'react';
import Style from './Menu.module.css';
import Image from 'next/image';
import FullLogo from '@/public/svg/assets-logo-full.svg';
import MiniLogo from '@/public/svg/assets-t-logo.svg';
import { useRouter } from 'next/navigation';

interface IProps {
  collapsed?: boolean;
}

export default memo((props: IProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className={Style.menuLogo} onClick={handleClick}>
      {props.collapsed ? <Image src={MiniLogo} alt='miniLogo' /> : <Image src={FullLogo} alt='fullLogo' />}
    </div>
  );
});

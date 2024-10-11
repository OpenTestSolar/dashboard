import React, { memo } from 'react';
import { Button, Layout, Space } from 'tdesign-react';
import { ViewListIcon } from 'tdesign-icons-react';
import { useAppDispatch } from 'modules/store';
import { toggleMenu } from 'modules/global';
import HeaderIcon from './HeaderIcon';
import ProjectSelector from './ProjectSelector';
import { HeaderMenu } from '../Menu';
import Style from './index.module.less';


const { Header } = Layout;

export default memo((props: { showMenu?: boolean }) => {
  const dispatch = useAppDispatch();

  let HeaderLeft;
  if (props.showMenu) {
    HeaderLeft = (
      <div>
        <HeaderMenu />
      </div>
    );
  } else {
    HeaderLeft = (
      <Space align='center'>
        <Button
          shape='square'
          size='large'
          variant='text'
          onClick={() => dispatch(toggleMenu(null))}
          icon={<ViewListIcon />}
        />
        <ProjectSelector></ProjectSelector>
      </Space>
    );
  }

  return (
    <Header className={Style.panel}>
      {HeaderLeft}
      <HeaderIcon />
    </Header>
  );
});

import { memo } from 'react';
import { ViewListIcon } from 'tdesign-icons-react';
import { Button, Layout, Space } from 'tdesign-react';
import HeaderIcon from './HeaderIcon';
import Style from './HeaderNav.module.css';
import { HeaderMenu } from './Menu';
import ProjectSelector from './ProjectSelector';

const { Header } = Layout;

export default memo((props: { showMenu?: boolean }) => {
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
          // onClick={() => dispatch(toggleMenu(null))}
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

import { NextRouter, useRouter } from 'next/router';
import { memo, ReactElement, useState } from 'react';
import { HistoryIcon, ListIcon, TaskIcon } from 'tdesign-icons-react';
import { Menu, MenuValue } from 'tdesign-react';
import Style from './Menu.module.css';
import MenuLogo from './MenuLogo';

const { MenuItem, HeadMenu } = Menu;

interface IMenuProps {
  showLogo?: boolean;
  showOperation?: boolean;
}

interface NaviMenu {
  label: string;
  icon: ReactElement;
  link: string;
}

const leftMenues: NaviMenu[] = [
  {
    label: '镜像库',
    icon: <ListIcon />,
    link: 'registry',
  },
  {
    label: '测试任务',
    icon: <TaskIcon />,
    link: 'tasks',
  },
  {
    label: '执行记录',
    icon: <HistoryIcon />,
    link: 'records',
  },
];

const renderMenuItems = (router: NextRouter) => {
  return leftMenues.map((item) => {
    const { label, icon, link } = item;

    return (
      <MenuItem key={link} value={label} icon={icon} onClick={() => router.push(link)}>
        {label}
      </MenuItem>
    );
  });
};

/**
 * 顶部菜单
 */
export const HeaderMenu = memo(() => {
  // const globalState = useAppSelector(selectGlobal);
  const router = useRouter();
  const [active, setActive] = useState<MenuValue>(router.pathname); // todo

  return (
    <HeadMenu
      expandType='popup'
      style={{ marginBottom: 20 }}
      value={active}
      theme={'light'}
      onChange={(v) => setActive(v)}
    >
      {renderMenuItems(router)}
    </HeadMenu>
  );
});

/**
 * 左侧菜单
 */
export default memo((props: IMenuProps) => {
  const router = useRouter();

  const bottomText = false ? `0.1.0` : `TDesign Starter 0.1.0`;

  return (
    <Menu
      width='232px'
      style={{ flexShrink: 0, height: '100%' }}
      className={Style.menuPanel2}
      value={router.pathname}
      theme={'light'}
      collapsed={false}
      operations={props.showOperation ? <div className={Style.menuTip}>{bottomText}</div> : undefined}
      logo={props.showLogo ? <MenuLogo collapsed={false} /> : undefined}
    >
      {renderMenuItems(router)}
    </Menu>
  );
});

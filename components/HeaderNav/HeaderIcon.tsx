import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Icon, PoweroffIcon, SettingIcon, UserCircleIcon } from 'tdesign-icons-react';
import { Button, Dropdown, Popup, Space } from 'tdesign-react';
import Style from './HeaderIcon.module.css';

const { DropdownMenu, DropdownItem } = Dropdown;

export default memo(() => {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const navigate = useNavigate();

  const clickHandler = (data: any) => {
    if (data.value === 1) {
      router.push('/user/index');
    }
  };
  const handleLogout = async () => {
    // await dispatch(logout());
    router.push('/login/index');
  };

  return (
    <Space align='center'>
      <Dropdown trigger={'click'} onClick={clickHandler}>
        <Button variant='text' className={Style.dropdown}>
          <Icon name='user-circle' className={Style.icon} />
          <span className={Style.text}>Tencent</span>
          <Icon name='chevron-down' className={Style.icon} />
        </Button>
        <DropdownMenu>
          <DropdownItem value={1}>
            <div className={Style.dropItem}>
              <UserCircleIcon />
              <span>个人中心</span>
            </div>
          </DropdownItem>
          <DropdownItem value={1} onClick={handleLogout}>
            <div className={Style.dropItem}>
              <PoweroffIcon />
              <span>退出登录</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Popup content='页面设置' placement='bottom' showArrow destroyOnClose>
        <Button
          className={Style.menuIcon}
          shape='square'
          size='large'
          variant='text'
          // onClick={() => dispatch(toggleSetting())}
          icon={<SettingIcon />}
        />
      </Popup>
    </Space>
  );
});

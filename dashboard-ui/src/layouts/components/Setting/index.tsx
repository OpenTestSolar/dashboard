import React, { memo } from 'react';
import { Col, Row, Switch } from 'tdesign-react';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { openSystemTheme, selectGlobal, switchColor, switchTheme, toggleShowBreadcrumbs } from 'modules/global';
import { ETheme } from 'types/index.d';
import RadioRect from './RadioRect';

import Light from 'assets/svg/assets-setting-light.svg?react';
import Dark from 'assets/svg/assets-setting-dark.svg?react';
import System from 'assets/svg/assets-setting-auto.svg?react';

import Style from './index.module.less';

enum ESettingTheme {
  system,
}

const themeList = [
  {
    value: ETheme.light,
    image: <Light />,
    name: '明亮',
  },
  {
    value: ETheme.dark,
    image: <Dark />,
    name: '黑暗',
  },
  {
    value: ESettingTheme.system,
    image: <System />,
    name: '跟随系统',
  },
];

export default memo(() => {
  const dispatch = useAppDispatch();
  const globalState = useAppSelector(selectGlobal);

  const handleThemeSwitch = (value: any) => {
    if (value === ESettingTheme.system) {
      dispatch(openSystemTheme());
    } else {
      dispatch(switchTheme(value));
      dispatch(switchColor(globalState.color));
    }
  };

  return (
    <div>
      <div className={Style.settingTitle}>主题模式</div>
      <RadioRect
        defaultValue={globalState.systemTheme ? ESettingTheme.system : globalState.theme}
        onChange={handleThemeSwitch}
        options={themeList}
      />

      <div className={Style.settingTitle}>元素开关</div>

      <Row justify='space-between'>
        <Col>
          <div className={Style.settingSubTitle}>显示 Breadcrumbs</div>
        </Col>
        <Col>
          <Switch size='large' value={globalState.showBreadcrumbs} onChange={() => dispatch(toggleShowBreadcrumbs())} />
        </Col>
      </Row>
    </div>
  );
});

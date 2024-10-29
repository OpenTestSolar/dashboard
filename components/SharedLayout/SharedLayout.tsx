'use client';

import { MyLayoutProps } from '@/app/lib/common';
import FooterNav from '@/components/FooterNav/FooterNav';
import HeaderNav from '@/components/HeaderNav/HeaderNav';
import Navigation from '@/components/Navigation/Navigation';
import 'tdesign-react/dist/tdesign.css';
import { Layout } from 'tdesign-react';
import Style from './SharedLayout.module.css';

const { Content, Aside } = Layout;

const SharedLayout = ({ children }: MyLayoutProps) => {
  return (
    <Layout className={Style.panel}>
      <HeaderNav></HeaderNav>
      <Layout>
        <Aside style={{ borderTop: '1px solid var(--component-border)' }}>
          <Navigation></Navigation>
        </Aside>
        <Layout>
          <Content>{children}</Content>
          <FooterNav></FooterNav>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SharedLayout;

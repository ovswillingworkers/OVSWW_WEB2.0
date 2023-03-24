'use client'


import React from 'react';

import '../../styles/global.scss';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import Link from 'next/link';
import Login from '../auth/Login';
import { Footer } from '../Footer';




const { Header, Content } = Layout;

export default function admin() {


  return (
    <>
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
          ><div className="nav_home">
        <Link href="/">Willing Workers</Link>
      </div></div>
      <Menu
  theme="dark"
  mode="horizontal"
  defaultSelectedKeys={['1']}
  items={[    {      key: '1',      label: 'Sign In',    },  ]}
/>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>OVS Willing Workers</Breadcrumb.Item>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Log In</Breadcrumb.Item>
        </Breadcrumb>
        <div className="admin-layout">
        <h2>Welcome to the Admin Area</h2>
  <p>
    Please log in to access the admin dashboard. Only registered admins are authorized to log in.
  </p>
  <Login/>
</div>
      </Content>
    
    </Layout>
    <Footer/>
  </>
  );
};


'use client'


import React, { useEffect } from 'react';

import '../../styles/global.scss';
import {  Layout, Menu, theme } from 'antd';

import Link from 'next/link';
import Login from '../auth/Login';
import { Footer } from '../Footer';
import { Provider } from 'react-redux';
import { store_0001 } from '../redux/store/store';
import AdminNav from '../dashboard/adminNav';





const { Header, Content } = Layout;

export default function admin() {



  return (
    <>
    <Provider store={store_0001}>
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      {/* <AdminNav image={''} banner={''} email={''}/> */}
      <Menu
  theme="dark"
  mode="horizontal"
  defaultSelectedKeys={['1']}
  items={[    {      key: '1',      label: 'Sign In',    },  ]}
/>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
       
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

    </Provider>
  </>
  );
};


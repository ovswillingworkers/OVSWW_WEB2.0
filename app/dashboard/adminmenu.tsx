'use client'


import React, { useRef, useState } from 'react';
import "../../styles/global.scss";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme , Breadcrumb,} from 'antd';
import Image from "next/image"
import Logged from '@/app/auth/Logged';
import { Button, Space } from 'antd';
import Link from 'next/link';





type User={
  image:string
}
// const { Header, Content } = Layout;
const { Header, Content,Sider } = Layout;

export default function AdminMenu(){


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState('user');
  const userContentRef = useRef(null);
  const jobPostingContentRef = useRef(null);

  const handleOptionClick = (event:any) => {
    const selectedValue = event.key;
    setSelectedOption(selectedValue);
  };

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

      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>

        <div className="admin-layout">
        <div className="adminMenu">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          >
          <div className="logo" />
          <Logged image={''}/>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[selectedOption]} 
            onClick={handleOptionClick} 
            >
            <Menu.Item key="user" icon={<UserOutlined />} label="User">
              User
            </Menu.Item>
            <Menu.Item key="job-posting" icon={<UploadOutlined />} label="Job Posting">
              Job Posting
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div ref={userContentRef} style={{ display: selectedOption === 'user' ? 'block' : 'none' }}>
              <h2>User Content</h2>
              <p>This is the content for user.</p>
            </div>

            <div ref={jobPostingContentRef} style={{ display: selectedOption === 'job-posting' ? 'block' : 'none' }}>
              <h2>Job Posting Content</h2>
              <p>This is the content for job posting.</p>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
      

</div>
      </Content>
    
    </Layout>
    
   
            </>
  );
};

'use client'


import React, { useEffect, useRef, useState } from 'react';
import "../../styles/global.scss";
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme , Breadcrumb,} from 'antd';
import Image from "next/image"
import Logged from '@/app/auth/Logged';
import { Button, Space } from 'antd';
import Link from 'next/link';
import CreateJobPost from './careerpost/careerpost';
import ListJobPosting from './careerpost/listjobpost';
import { Footer } from '../Footer';
import EditJobPost from './careerpost/editjobpost';
import { JobPosting } from '../components/jobpost';





type User={
  image:string
}
// const { Header, Content } = Layout;
const { Header, Content,Sider } = Layout;

export default function AdminMenu( ){
 
  const [session, setSession] = useState<JobPosting>({
    id: '',
    title: '',
    location: '',
    salary: '',
    date: '',
    description: '',
    qualifications: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    },
    expirationDate: '',
  });
  



  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState('user');
  const userContentRef = useRef(null);
  const jobPostingContentRef = useRef(null);

  const handleOptionClick = (event:any, prop?:JobPosting) => {
    
    const selectedValue = event.key || event;
    setSelectedOption(selectedValue);

    if (prop) {
      setSession(prop);
    }
  };

  return (
    <>
    
    <Layout>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
   

      </Header>


     


      <Content className="dashboard-site-layout" style={{ padding: '0 50px' }}>

        <div className="dashboard-layout">
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
    

          <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedOption]}
                    onClick={handleOptionClick}
                  >
                    <Menu.SubMenu key="submenu-user" icon={<UserOutlined />} title="User">
                      <Menu.Item key="new-user">New User</Menu.Item>
                      <Menu.Item key="edit-user">Edit User</Menu.Item>
                      <Menu.Item key="delete-user">Delete User</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="submenu-job-posting" icon={<UploadOutlined />} title="Job Posting">
                      <Menu.Item key="new-job-posting">New Job Posting</Menu.Item>
                      <Menu.Item key="all-job-posting">All Job Posting</Menu.Item>
                     
                    </Menu.SubMenu>
                  </Menu>
        </Sider>
        <Layout>
        <Content className='dashboard-content' style={{ margin: '24px 16px 0' }}>
  {selectedOption === 'user' && (
    <div ref={userContentRef} style={{ display: 'block' }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
   <p>MAIN MENU</p>
    </div>
  )}
  {selectedOption === 'job-posting' && (
    <div ref={jobPostingContentRef} style={{ display: 'block' }}>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>Job Posting Content</h2>
      </Header>
      <p>This is the content for job posting.</p>
    </div>
  )}
  {selectedOption === 'new-user' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>New User Content</h2>
      </Header>
      <p>This is the content for creating new user.</p>
    </div>
  )}
  {selectedOption === 'edit-user' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>Edit User Content</h2>
      </Header>
      <p>This is the content for editing user.</p>
    </div>
  )}
  {selectedOption === 'delete-user' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>Delete User Content</h2>
      </Header>
      <p>This is the content for deleting user.</p>
    </div>
  )}
  {selectedOption === 'new-job-posting' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>New Job Posting Content</h2>
      </Header>
      <CreateJobPost onClick={handleOptionClick} />
    </div>
  )}
  {selectedOption === 'all-job-posting' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
      </Header>
    < ListJobPosting onClick={handleOptionClick} />
    </div>
  )}
  {selectedOption === 'delete-job-posting' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>Delete Job Posting Content</h2>
      </Header>
      <p>This is the content for deleting job posting.</p>
    </div>
  )}
    {selectedOption === 'edit-job-posting' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
      <Button onClick={() =>setSelectedOption("all-job-posting")}>Back</Button>
       
      </Header>
      <EditJobPost prop={session} setSelectedOption={handleOptionClick} />
    </div>
  )}
</Content>

        </Layout>
      </Layout>
    </div>
      

</div>
      </Content>
    
    </Layout>
    
    <Footer/>
   
            </>
  );
};

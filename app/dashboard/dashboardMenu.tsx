'use client'

import React, {useEffect, useRef, useState } from 'react';
import "../../styles/global.scss";
import { UploadOutlined,UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Button } from 'antd';
import CreateJobPost from './careerpost/careerpost';
import ListJobPosting from './careerpost/listjobpost';
import { Footer } from '../Footer';
import JobPostingEditor from './careerpost/jobposteditor';
import { JobPosting } from '../components/jobpost';
import { User } from '../components/user';
import NewUserPost from './userpost/newuserpost';
import ListAllUser from './userpost/listAllUsers';
import getAuthRedux from '../auth/getAuthRedux';
import { useDispatch, useSelector } from 'react-redux';
import { setReduxUser } from '../redux/reducer/userSlice';
import EditUserPost from './userpost/editUser';
import Mainmenu from './mainmenu';


// const { Header, Content } = Layout;
const { Header, Content,Sider } = Layout;

export default function DashboardMenu( ){

  const user = useSelector((state: any) => state.user.user );
  
  const dispatch = useDispatch()
  const [editJobSession, setEditJobSession] = useState<JobPosting >({
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

  const [editUserSession, setEditUserSession] = useState<User>({
    id:'',
    image:'',
    name: '',
    role:'',
    email:'',
  })


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState('submenu-main-menu');
  const userContentRef = useRef(null);
  const jobPostingContentRef = useRef(null);
  
  const items = [ {
    key: 'submenu-main-menu',

    title: 'Main Menu',
    label: 'Main Menu',
    
  },
   user.role === 'admin' ?  {    key: 'submenu-user',    icon: <UserOutlined />,    title: 'User',    label: 'Admin Access',    children: [      { key: 'new-user', label: 'New User' },      { key: 'all-list-user', label: 'View All Users' },    ],
} : null,
{
  key: 'submenu-job-postin',
  icon: <UploadOutlined />,
  title: 'Job Posting',
  label: 'Job Posting',
  children: [
    { key: 'new-job-posting', label: 'New Job Posting' },
    { key: 'all-job-posting', label: 'All Job Posting' },
  ],
},
];


  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
    let valid =  await getAuthRedux(user)
    
     if (valid && isMounted){
      dispatch(setReduxUser(valid as User));
     }
    }

    
    fetchUser();
 
    return () => {
      isMounted = false;
    };
   
  }, []);
    





 



  const handleOptionClick = (event:any, prop?:JobPosting) => {
    
    const selectedValue = event.key || event;
    setSelectedOption(selectedValue);


    if (prop) {
      setEditJobSession(prop);
    }
  };

  const handleUserOptionClick = (event:any, prop?:User) => {
    console.log("ONE EXAMPLE DUDE")
    const selectedValue = event.key || event;
    setSelectedOption(selectedValue);


    if (prop) {
      setEditUserSession(prop);
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
  items={items}
/>


        </Sider>
        <Layout>
        <Content className='dashboard-content' style={{ margin: '24px 16px 0' }}>
  {selectedOption === 'submenu-main-menu' && (
    <div ref={userContentRef} style={{ display: 'block' }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
   <p>MAIN MENU</p>
   <Mainmenu/>
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
     <NewUserPost/>
    </div>
  )}
  {selectedOption === 'all-list-user' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
        <h2>View All User Content</h2>
      </Header>
     <ListAllUser onClick={handleUserOptionClick}/>
    </div>
  )}
      {selectedOption === 'edit-user' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
      <Button onClick={() =>setSelectedOption("all-list-user")}>Back</Button>
       
      </Header>
      <EditUserPost  setSelectedOption={handleUserOptionClick} prop={editUserSession} />
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
    {selectedOption === 'edit-job-posting' && (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} >
      <Button onClick={() =>setSelectedOption("all-job-posting")}>Back</Button>
       
      </Header>
      <JobPostingEditor  setSelectedOption={handleOptionClick} prop={editJobSession} />
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

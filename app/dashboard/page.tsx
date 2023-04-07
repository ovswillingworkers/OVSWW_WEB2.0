
'use client'
import React, { useEffect } from "react";
import DashboardMenu from "./dashboardMenu";
import { Provider } from "react-redux";
import { store_0001 } from "../redux/store/store";
import AdminSession from "./adminsession";
import getAuthRedux from "../auth/getAuthRedux";



// import Image from "next/image";
// import { Footer } from "../Footer";
// import { signOut } from "next-auth/react";
// import Logged from "@/app/auth/Logged";
// // import { Footer } from "./Footer";
// import AdminMenu from "./adminmenu";
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import Link from "next/link";
// import Login from "../auth/Login";


// const { Header, Content } = Layout;

function Dashboard() {
 
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = AdminSession()
  //   console.log( result, " THIS IS THE NE REDIRECT")
  //     // Do something with the data
  //   }
  //   fetchData();
  // }, []);
  


  return (
<>
<Provider store={store_0001}>

<DashboardMenu />


</Provider>

 </>
  );
}

export default Dashboard;
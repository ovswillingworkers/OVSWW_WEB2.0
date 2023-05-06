"use client";
import React, { useEffect } from "react";
import DashboardMenu from "./dashboardMenu";
import { Provider } from "react-redux";
import { appStore } from "../redux/store/store";
import AdminSession from "./adminsession";
import useAuthRedux from "../auth/getAuthRedux";

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
  return (
    <>
      <Provider store={appStore}>
        <DashboardMenu />
      </Provider>
    </>
  );
}

export default Dashboard;

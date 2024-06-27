"use client";
import React from "react";
import DashboardMenu from "./dashboardMenu";
import { Provider } from "react-redux";
import { appStore } from "../redux/store/store";



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



import { getServerSession, unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"


// export default async function Dashboard() {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     redirect("/api/auth/signin")
//   }

//   return (

//   'use client'

import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import "../../../styles/global.scss";
// import styled from "styled-components";
import naturewalk from "../../../public/assets/nature_walk.jpg";
import helpingHands from "../../../public/assets/hands.jpg";

import Image from "next/image";
import { Footer } from "../../Footer";
import { signOut } from "next-auth/react";
import Logged from "@/app/auth/Logged";
// import { Footer } from "./Footer";

async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }

  
  return (
    
    <div className="about-container">
      <div className="about-container-banner mt-4 p-5 bg-primary text-white">
      <Logged image={session.user?.image || ""}/>
        <h1>Dashboard</h1>
        <p>The best people in the service of helping individuals</p>
      </div>

      <div className="about-container-text">
        <p>CREATE EDIT DELETE user


        </p>

        <p>CREATE EDIT DELETE Suspend</p>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
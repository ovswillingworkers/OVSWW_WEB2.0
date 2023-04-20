'use client'
import { Button, Form, Input, Upload } from "antd";
import "../../../styles/global.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { sendJobApplicationEmail } from "./sendEmail";
import toast from "react-hot-toast";
import axios from "axios";
import { Footer } from "@/app/Footer";
import Nav from "@/app/Nav";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import Application from "./application";



interface IProps {
  params: {
    career: string;
  };
  searchParams: {};
}

const CareerPost = ({ params }: IProps) => {

  return(
    <>
    <Application/>
    </>
  )

}

export default CareerPost;

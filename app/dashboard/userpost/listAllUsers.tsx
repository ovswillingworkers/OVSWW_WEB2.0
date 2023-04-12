'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {Button} from "antd";

import getJobPostings from "../../api/getJobPostings";
import { JobPosting } from "../../components/jobpost";
import { User} from "../../components/user"
import { deleteJobPost } from "../../api/deleteJobPosting";
import toast from "react-hot-toast";
import { getUserList } from "@/app/api/getUserList";

import { useSelector } from 'react-redux';
import { AppState } from "@/app/redux/store/store";


export default function ListAllUser(props: any) {
  const user = useSelector((state: AppState) => state.user.user);
  const [userList, setUserList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  console.log("user from redux here at VIEW ALL USERS:", user)
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserList('');

        if (data){

          setUserList(data as User[]);
          console.log(userList, " This is the user List")
          if(userList.length ==0){
            setIsLoading(false)
            return
          }
            setIsLoading(true);
        }
    
      
      } catch (error) {
        console.error(error);
        setError("Error fetching job postings. Please try again later.");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

      




  
  function handleDelete(id: string) {
    // Logic to delete the job posting with the given ID
    try {
      deleteJobPost(id);
      setUserList(userList.filter((userList) => userList.id !== id));
      toast.success("Job Post Deleted");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Error deleting job post");
    }
  }
  
  

return (
  <div className="list-jobpost-container">
  

  {isLoading ? (
       userList.map((userList, index) => (
        <div className="list-job-posting" key={index}>
        <h2>{userList.name}</h2>
        <h4>{userList.email}</h4>
        <p>Role: {userList.role}</p>
    <Button onClick={() => props.onClick("edit-job-posting", userList)}>Edit</Button>
    <Button style={{background:"red", color:"white"}} onClick={() => handleDelete(userList.id)}>Delete</Button>
        
        
      </div>
        ))
        ):(
        <div className="no-job-posting">
       <p>No User postings are currently available
       </p>
     </div>
     
     ) }




  </div>
);
        }
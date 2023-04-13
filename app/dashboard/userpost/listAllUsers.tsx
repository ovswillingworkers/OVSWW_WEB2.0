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

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from "@/app/redux/store/store";
import { setBulkUser } from "@/app/redux/reducer/usersSlice";


export default function ListAllUser(props: any) {
  const user = useSelector((state: AppState) => state.user.user);
  const users = useSelector((state: AppState) => state.users.users);
  const [userList, setUserList] = useState<User[]>(users.length > 0 ? users as User[] : []);
  const [isLoading, setIsLoading] = useState<boolean>(userList.length > 0);
  const [error, setError] = useState("");
  const dispatch = useDispatch()


 
  
  useEffect(() => {
    console.log(" USE EFFECT BEING CALLED ")
    let isMounted = true;
    async function fetchData() {
      try {
        const data = await getUserList(user.email);
        console.log(" THIS IS THE USER LIST DATA RETRUN !", data)
        if (data && isMounted){

          dispatch(setBulkUser(data))
          setUserList(data as User[]);
          setIsLoading(true);
          // setUserList(data as User[]);
          console.log(data, " This is the user List")
            setIsLoading(true);
        }
    
      
      } catch (error) {
        console.error(error);
        setError("Error fetching job postings. Please try again later.");
        setIsLoading(false);
      }
    }


    if (user.role == "admin" && users.length ==0){
      fetchData();
     
    }
    if (user.role === "admin" && users.length > 0) {
      setUserList(users as User[]);
      setIsLoading(true);
    }

    return () => {
      isMounted = false;
    };

  }, []);

      console.log(" THIS IS THE USERLIST , ",userList, isLoading)




  
  function handleDelete(id: string) {
    // Logic to delete the job posting with the given ID
    // try {
    //   deleteJobPost(id);
    //   setUserList(userList.filter((userList) => userList.id !== id));
    //   toast.success("Job Post Deleted");
    // } catch (error:any) {
    //   console.error(error.message);
    //   toast.error("Error deleting job post");
    // }
  }
  
  

return (
  <div className="list-user-container">
  

  {isLoading ? (
       userList.map((userList, index) => (
        <div className="list-user-posting" key={index}>
        <h2>{userList.name}</h2>
        <h4>{userList.email}</h4>
        <p>Role: {userList.role}</p>
    <Button onClick={() => props.onClick("edit-user", userList)}>Edit</Button>
    <Button style={{background:"red", color:"white"}} onClick={() => handleDelete(userList.id)}>Delete</Button>
        
        
      </div>
        ))
        ):(
        <div className="no-user-posting">
       <p>No User postings are currently available
       </p>
     </div>
     
     ) }




  </div>
);
        }
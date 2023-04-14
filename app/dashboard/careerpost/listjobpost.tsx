'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {Button} from "antd";
import getJobPostings from "../../../app/api/getJobPostings";
import { JobPosting } from "../../../app/components/jobpost";
import { deleteJobPost } from "../../../app/api/deleteJobPosting";
import toast from "react-hot-toast";
import { setJobPosting } from "@/app/redux/reducer/jobPostingsSlice";
import { useDispatch, useSelector } from "react-redux";



export default function ListJobPosting(props: any) {
  const dispatch = useDispatch()
  const jobPostings = useSelector((state: any) => state.jobPostings.jobPostings);
  const JobPostings_list = useSelector((state: any) => state.jobPostings);
  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(JobPostings_list.jobPostings.length > 0 ? JobPostings_list.jobPostings as JobPosting[] : []);
  const [isLoading, setIsLoading] = useState(JobPostings_list.jobPostings.length > 0);
  const [error, setError] = useState("");

console.log(" THIS IS JOB POSTING BRO", JobPostings_list, isLoading)

useEffect(() => {
  let isMounted = true;
  async function fetchData() {

        
        const data = await getJobPostings();
        if (data && isMounted){
          dispatch(setJobPosting(data as JobPosting[]));
          setIsLoading(true);
          console.log(JobPostings_list, " GETTING JOB POSTING HERE")
          setJobListPostings(data as JobPosting[]);

        }

      
    
  }

  if (!JobPostings_list.jobPostings.length){
    fetchData();
   
  }
  console.log(JobPostings_list.jobPostings.length, " HERE IS OUTSIDE THE ASYNC")
  return () => {
    isMounted = false;
  };
}, []);

      console.log(JobPostings_list, " THIS IS THE MAP FOR JOB POOSTING")




  
      function handleDelete(id: string) {
        try {
          deleteJobPost(id);
          dispatch(setJobPosting(jobPostings.filter((jobPosting:any) => jobPosting.id !== id)));
          toast.success("Job post deleted");
        } catch (error:any) {
          console.error(error.message);
          toast.error("Error deleting job post");
        }
      }
      
  
  

return (
  <div className="list-jobpost-container">
  

  {isLoading ? (
       jobListPostings.map((jobPosting, index) => (
        <div className="list-job-posting" key={index}>
        <h2>{jobPosting.title}</h2>
        <h4>{jobPosting.location}</h4>
        <p>Salary: {jobPosting.salary}</p>
        <p>Date: {jobPosting.date}</p>
        <Button onClick={() => props.onClick("edit-job-posting", jobPosting)}>Edit</Button>
    <Button style={{background:"red", color:"white"}} onClick={() => handleDelete(jobPosting.id)}>Delete</Button>
        <hr />
        <h3>Description:</h3>
        <p>{jobPosting.description}</p>
        <h3>Qualifications:</h3>
        <p>{jobPosting.qualifications}</p>

        <h3>Contact:</h3>
        <p>Name: {jobPosting.contact.name}</p>
        <p>Email: {jobPosting.contact.email}</p>

        
        <p>Phone: {jobPosting.contact.phone}</p>
        
      </div>
        ))
        ):(
        <div className="no-job-posting">
       <p>No job postings are currently available
       </p>
     </div>
     
     ) }




  </div>
);
        }
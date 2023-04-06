'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {Button} from "antd";
import EditJobPost from "./editjobpost";
import getJobPostings from "../../../app/api/getJobPostings";
import { JobPosting } from "../../../app/components/jobpost";
import { deleteJobPost } from "../../../app/api/deleteJobPosting";
import toast from "react-hot-toast";




export default function ListJobPosting(props: any) {
  
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobPostings();
        setJobPostings(data);
    
      if(data.length==0){
        setIsLoading(false)
        return
      }
        setIsLoading(true);
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
      setJobPostings(jobPostings.filter((jobPosting) => jobPosting.id !== id));
      toast.success("Job Post Deleted");
    } catch (error:any) {
      console.error(error.message);
      toast.error("Error deleting job post");
    }
  }
  
  

return (
  <div className="list-jobpost-container">
  

  {isLoading ? (
       jobPostings.map((jobPosting, index) => (
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
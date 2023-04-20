"use client";

import { useEffect, useState } from "react";
import "../../styles/global.scss";
import { Footer } from "../Footer";
import Link from "next/link";
import { JobPosting } from "../components/jobpost";
import Nav from "../Nav";
import getJobPostings from "../api/getJobPostings";
import { useDispatch, useSelector } from "react-redux";
import { setJobPosting } from "../redux/reducer/jobPostingsSlice";
import { AppState } from "../redux/store/store";




function CareerList() {
  const dispatch = useDispatch()

 
  const JobPostings_list = useSelector((state:any) => { console.log(state); return state.jobPostings.jobPostings});
  


  const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(JobPostings_list.length > 0 ? JobPostings_list as JobPosting[] : []);
  const [isLoading, setIsLoading] = useState(jobListPostings.length > 0);
  const [error, setError] = useState("");

  console.log(jobListPostings, " THIS IS FIRST ")

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
  
          
          const data = await getJobPostings();
          if (data && isMounted){
             
             
            setIsLoading(true);
            console.log(data as JobPosting[], " GETTING JOB POSTING HERE")
           setJobListPostings(data as JobPosting[]);
  
          }
  
        
      
    }
  
    if (!jobListPostings.length){
      fetchData();
     
    }
    console.log(jobListPostings.length, " HERE IS OUTSIDE THE ASYNC")
   
    return () => {
      isMounted = false;
    };
  }, []);
  
  console.log(jobListPostings, " HERE THE ASYNC")
  dispatch(setJobPosting(jobListPostings as JobPosting[]));




  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;



  return (
    <>
    <Nav image={""} banner={""} />
    <div className="career">
      <div className="career-container-banner mt-4 p-5 bg-primary text-white">
        <h1>Career</h1>
        <p></p>
      </div>


        <div className="career-text">
        <h1>Join our team today</h1>
  <h5 style={{}}>
    At Willing Workers, we are always looking for dedicated individuals to join our team. 
    We offer competitive salaries, comprehensive benefits, and opportunities for growth and advancement. 
    Come visit us for a tour to see what we're all about and start your career with us today!
  </h5>
          <h3>
            {" "}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                "4813 W. Washington Blvd., Los Angeles, Los Angeles 90016"
                )}`}
                target="_blank"
                >
              4813 W. Washington Blvd.<br></br>
              Los Angeles, CA 90016
            </a>
          </h3>
          <h3>Monday - Friday 8:00am - 3:00pm</h3>
          <h3>
            Phone:<a href="tel:323-729-9898">323-729-9898</a>
          </h3>
          <h3>Email: info@willingworkers.org</h3>
        </div>
        
      <div className="career-jobpost-container">
      {isLoading ? (
       jobListPostings.map((jobPosting: any, index: any) => (
         <div className="job-posting" key={index}>
            <h2>{jobPosting.title}</h2>
            <h4>{jobPosting.location}</h4>
            <p>Salary: {jobPosting.salary}</p>
            <p>Date: {jobPosting.date}</p>
            <Link href={`/career?id=${jobPosting.id}&name=${jobPosting.name}`} as={`/career/${jobPosting.id}`}>
              Apply Here
            </Link>
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
       <p>Sorry, no job postings are currently available. Please feel free to&nbsp;
         <a href="tel:123-456-7890">call</a>&nbsp;or&nbsp;
         <a href="mailto:jobs@example.com">email</a>&nbsp;
         us to inquire about future openings.
       </p>
     </div>
     
     ) }

      </div>
      
      <Footer />
    </div>
        </>
  );
}

export default CareerList;

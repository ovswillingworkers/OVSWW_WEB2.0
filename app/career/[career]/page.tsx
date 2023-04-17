'use client'

import getJobPostings from "@/app/api/getJobPostings";
import { JobPosting } from "@/app/components/jobpost";
import { setJobPosting } from "@/app/redux/reducer/jobPostingsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  params: {
    career: string;
  };
  searchParams: {};
}

const CareerPost = ({ params }: IProps) => {
//   const JobPostings_list = useSelector((state: any) => state.jobPostings);
//   const [jobListPostings, setJobListPostings] = useState<JobPosting[]>(JobPostings_list.jobPostings.length > 0 ? JobPostings_list.jobPostings as JobPosting[] : []);
//   const dispatch = useDispatch()
//   const [isLoading, setIsLoading] = useState(JobPostings_list.jobPostings.length > 0);


  
// useEffect(() => {
//   let isMounted = true;
//   async function fetchData() {

        
//         const data = await getJobPostings();
//         if (data && isMounted){
//           dispatch(setJobPosting(data as JobPosting[]));
//           setIsLoading(true);
//           console.log(JobPostings_list, " GETTING JOB POSTING HERE")
//           setJobListPostings(data as JobPosting[]);

//         }

      
    
//   }

//   if (!JobPostings_list.jobPostings.length){
//     fetchData();
   
//   }
//   console.log( " HERE Career getting Jobposting")
//   return () => {
//     isMounted = false;
//   };
// }, []);


  return <div>Career Post</div>;
};

export default CareerPost;

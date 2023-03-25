"use client";

import { useEffect, useState } from "react";
import "../../styles/global.scss";
// import { Footer } from "./Footer";
import dotenv from "dotenv";
import { Footer } from "../Footer";
import Link from "next/link";
import axios from "axios"

interface JobPosting {
  id: string;
  title: string;
  location: string;
  salary: string;
  date: string;
  description: string;
  qualifications: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  }
}


async function getJobPostings() {
  try {
    const res = await axios.get("/api/getPost");
    const data = res.data;
    return data as JobPosting[]; // cast the response data to an array of JobPosting objects
  } catch (error) {
    console.error(error);
    return []; 
  }
}


function Career() {

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobPostings();
        setJobPostings(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching job postings. Please try again later.");
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // const [jobPostings, setJobPostings] = useState([
  //   {
  //     id:"1",
  //     title: 'Software Engineer',
  //     location: 'Los Angeles, CA',
  //     salary: '$100,000 - $120,000',
  //     date: 'March 15, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications:"",
  //     contact: {
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       phone: '555-555-5555',
  //     },
  //   },
  //   {
  //     id:"2",
  //     title: 'Product Manager',
  //     location: 'San Francisco, CA',
  //     salary: '$120,000 - $140,000',
  //     date: 'April 1, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications: 'Bachelor\'s degree in Business, Computer Science or related field. 5+ years of experience in product management.',
  //     contact: {
  //       name: 'Jane Smith',
  //       email: 'janesmith@example.com',
  //       phone: '555-555-5555',
  //     },
      
  //   },
  //   {
  //     id:"3",
  //     title: 'Software Engineer',
  //     location: 'Los Angeles, CA',
  //     salary: '$100,000 - $120,000',
  //     date: 'March 15, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications: 'Bachelor\'s degree in Computer Science or related field. 3+ years of experience in software engineering.',
  //     contact: {
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       phone: '555-555-5555',
  //     },
  //   },
  //   {
  //     id:"4",
  //     title: 'Product Manager',
  //     location: 'San Francisco, CA',
  //     salary: '$120,000 - $140,000',
  //     date: 'April 1, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications: 'Bachelor\'s degree in Business, Computer Science or related field. 5+ years of experience in product management.',
  //     contact: {
  //       name: 'Jane Smith',
  //       email: 'janesmith@example.com',
  //       phone: '555-555-5555',
  //     },
      
  //   },   {
  //     id:"5",
  //     title: 'Software Engineer',
  //     location: 'Los Angeles, CA',
  //     salary: '$100,000 - $120,000',
  //     date: 'March 15, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications: 'Bachelor\'s degree in Computer Science or related field. 3+ years of experience in software engineering.',
  //     contact: {
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       phone: '555-555-5555',
  //     },
  //   },
  //   {
  //     id:"6",
  //     title: 'Product Manager',
  //     location: 'San Francisco, CA',
  //     salary: '$120,000 - $140,000',
  //     date: 'April 1, 2023',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //     qualifications: 'Bachelor\'s degree in Business, Computer Science or related field. 5+ years of experience in product management.',
  //     contact: {
  //       name: 'Jane Smith',
  //       email: 'janesmith@example.com',
  //       phone: '555-555-5555',
  //     },
      
  //   },
  //   // Add more job postings here...
  // ]);

  if (isLoading) {
    return <div>Loading job postings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }




  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;



  return (
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
  
      {jobPostings.map((jobPosting, index) => (
          <div className="job-posting" key={index}>
            <h2>{jobPosting.title}</h2>
            <h4>{jobPosting.location}</h4>
            <p>Salary: {jobPosting.salary}</p>
            <p>Date: {jobPosting.date}</p>
            <Link href={`/apply?id=${jobPosting.id}`} as={`/apply/${jobPosting.id}`}>
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
      ))}

      </div>
      
      <Footer />
    </div>
  );
}

export default Career;

'use client'


import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import '../../styles/global.scss';
// import { Footer } from "./Footer";
import dotenv from 'dotenv';
import { Footer } from "../Footer";




const containerStyle = {
  width: "100%",
  height: "100%",
  /* Other styles for the map container */
};
const options = {
  disableDefaultUI: true,
  gestureHandling: "none",
};

function Contact() {
  const [jobPosting, setJobPosting] = useState(()=>{
    return( { 
    title: 'Software Engineer',
    location: 'Los Angeles, CA',
    salary: '$100,000 - $120,000',
    date: 'March 15, 2023',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    qualifications: 'Bachelor\'s degree in Computer Science or related field. 3+ years of experience in software engineering.',
    contact: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '555-555-5555',
    },
  })});
 // Use useEffect to trigger a resize of the map when the component mounts
useEffect(() => {
  window.dispatchEvent(new Event('resize'));
}, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
console.log(apiKey, "API KEY HERE")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const center = {
    lat: 34.03987169154813,
    lng: -118.34399681590634,
  };

  const Popup_map = {
    lat: 34.04287169154919,
    lng: -118.34399681590634,
  };

  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  var customLabel = {
    text: "A",
    color: "#636363",
    fontSize: "10px",
    fontWeight: "bold",
    top: "20px",
  };

  // Add state variable to store the state of the InfoWindow
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Add a state variable to store the current marker that is clicked
  const [currentMarker, setCurrentMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <div className="contact">
      <div className="contact-container-banner mt-4 p-5 bg-primary text-white">
        <h1>Career</h1>
        <p></p>
      </div>

      <div className="contact-container-information">
      <div className="job-posting">
  <h2>{jobPosting.title}</h2>
  <h4>{jobPosting.location}</h4>
  <p>Salary: {jobPosting.salary}</p>
  <p>Date: {jobPosting.date}</p>
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


        <div className="contact-text">
          <h1>Schedule a tour today</h1>
          <h5 style={{}}>
            Willing Workers is currently giving tours following CDC guidelines.
            Masks are mandatory during your visit.
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
      </div>
      <Footer />
    </div>
  );
}



export default Contact;

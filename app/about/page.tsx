'use client'

import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import '../../styles/global.scss';
// import styled from "styled-components";
import naturewalk from "../../public/assets/nature_walk.jpg";
import helpingHands from "../../public/assets/hands.jpg";

import Image from "next/image";
import { Footer } from "../Footer";
import Nav from "../Nav";
// import { Footer } from "./Footer";

function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
    <Nav image={""} banner={""}/>
   
    <div className="about-container">
      <div className="about-container-banner mt-4 p-5 bg-primary text-white">
        <h1>About Us</h1>
        <p>The best people in the service of helping individuals</p>
      </div>

      <div className="about-container-text">
        <div className="about-container-text-details">
          <div className="about-container-text-details-description">
            <div className="about-ourmission">
            <figure >
              <Image
                src={helpingHands}
                alt="A group of people participating in an outdoor activity"
                sizes="100vw"
                />
            </figure>



            <h1>"Our Mission"</h1>
            <p>
            At Willing Workers our mission is to empower individuals with intellectual and 
            developmental disabilities to lead fulfilling and independent lives. 
            Through community integration training and the development of healthy habits, 
            we promote independence, self-advocacy, and overall well-being. We focus on improving 
            the quality of life by addressing areas such as safety, personal health and hygiene, nutrition, physical fitness, and emergency preparedness. We believe in the inherent worth and potential of every individual and are committed to helping 
            them reach their highest potential and become full participants in their communities.
            </p>
           
                </div>
            <div className="about-container-text-values-image">
  <div className="about-container-text-values">
   
    <h1>"Our Values"</h1>
    <p>
    Our values guide everything we do at Willing Workers. 
    We put individuals first, empower them to grow, and strive for inclusivity. 
    We work closely with families and the community, continuously seeking improvement 
    while being transparent and accountable. Our values of compassion, dignity, diversity, 
    excellence, and honesty form the foundation of our mission to support and empower those we serve.
    </p>
  </div>
  <div className="about-container-text-image">
    <figure className="about-container-text-details-image">
      <Image
        src={naturewalk}
        alt="A group of people participating in an outdoor activity"
        sizes="100vw"
      />
    </figure>
  </div>
</div>
</div>
        </div>

        <div className="about-container-contacts">
          <h1 >Schedule a tour today</h1>
          <p >
            Willing Workers is currently giving tours following CDC guidelines.
            Masks are mandatory during your visit.
          </p>
          <br></br>
          <h5>
            {" "}
            4813 W. Washington Blvd.<br></br>
            Los Angeles , Los Angeles 90016
          </h5>
          <br></br>

          <h5>Telephone: (323) 937-5950</h5>
          <h5>
            Monday - Friday <br></br> 7am-3pm
          </h5>
          <br></br>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
}

export default About;

"use client";

import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import "../../styles/global.scss";
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
      <Nav image={""} banner={""} />

      <div className="about-container">
        <div className="about-container-banner mt-4 p-5 bg-primary text-white">
          <h1>About Us</h1>
          <p>The best people in the service of helping individuals</p>
        </div>

        <div className="about-container-text">
          <div className="about-container-text-details">
            <div className="about-container-text-details-description">
              <div className="about-ourmission">
                <figure>
                  <Image
                    src={helpingHands}
                    alt="A group of people participating in an outdoor activity"
                    sizes="100vw"
                  />
                </figure>

                <p>
                  <h1>"Our Mission"</h1>
                  Willing Workers is dedicated to the empowerment of people who have intellectual and 
                  developmental disabilities so that they may lead productive and self-reliant lives. 
                  By means of all-encompassing community integration initiatives and the promotion of health-conscious behaviors, 
                  we advocate for autonomy, self-determination, and holistic health. We improve quality of life 
                  by addressing safety, personal health, nutrition, physical fitness, and emergency preparedness. 
                  We are dedicated to helping people achieve their goals and become valued members of their communities.
                </p>
              </div>
              <div className="about-container-text-values-image">
                <div className="about-container-text-values ">
                  <h1>"Our Values"</h1>
                  <p>
                  We base everything that we do at Willing Workers on our core values. 
                  Our conduct and choices are guided by a set of guiding principles that are rooted in compassion, 
                  dignity, diversity, excellence, and honesty. Cultivating an atmosphere that promotes 
                  development and empowerment, we place the requirements and aspirations of every individual 
                  we assist as our top priority. With active engagement with families and the wider community, 
                  inclusivity is not merely an objective but a fundamental component of our methodology. 
                  Maintaining a commitment to excellence and transparency in every aspect of our operations is 
                  of the utmost importance to us. The dedication we have to these principles serves as the 
                  foundation of our work, driving us towards our objective of assisting and enabling the 
                  individuals we assist.

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
        </div>
        <div className="about-container-contacts">
          <h1>Schedule a tour today</h1>
          <p>
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

        <Footer />
      </div>
    </div>
  );
}

export default About;

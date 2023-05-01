'use client';
import { CSSProperties, useEffect, useState } from "react";
import '../styles/global.scss';
import { Bus, CoachIcon, HandsIcon } from "../public/assets/page";
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import w2 from "../public/assets/w2.jpg";
import w3 from "../public/assets/w3.jpg";
import w4 from "../public/assets/w4.jpg";
import w1 from "../public/assets/welcome.jpg";

import { useRouter } from "next/navigation";
import Image from 'next/image'
import getConfig from 'next/config';
import { Footer } from "./Footer";
import Nav from "./Nav";



const Home = () => {
  const [busRef, busInView] = useInView({ threshold: 0.0 });
  const [coachRef, coachInView] = useInView({ threshold: 0.0 });
  const [handsRef, handsInView] = useInView({ threshold: 0.0 });
  const [isBusVisible, setIsBusVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBusLoaded, setIsBusLoaded] = useState(false);
  const [isCoachLoaded, setIsCoachLoaded] = useState(false);
  const [isHandsLoaded, setIsHandsLoaded] = useState(false);


  useEffect(() => {

    if (handsInView) {
      setIsHandsLoaded(true);
    }
  }, [handsInView]);

  useEffect(() => {

    if (coachInView) {
      setIsCoachLoaded(true);
    }
    
    
  }, [coachInView]);


  useEffect(() => {

   
   
    if (busInView) {
      setIsBusVisible(true);
    }
   
  }, [busInView]);


  let navigate = useRouter();
  const routeProgramChange = (path: any) => {
    navigate.push(path);
  };
  // Declare a state variable to keep track of the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Declare a list of images to be displayed in the slide show
  const images = [w1, w2, w3, w4];

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);

    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);


  return (
    <div>
      <Nav image={""} banner={""}/>
      <div className="home-container">
        <div
          className="overlay mt-4 p-5 bg-primary text-white">
      <AnimatePresence initial={false}>
  <motion.div
    key={currentSlide}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
  >
    <Image src={images[currentSlide].src} layout="fill" objectFit="cover" alt={""} />
  </motion.div>
</AnimatePresence>

  
          <div className="home-intro"></div>

          <h1>Willing Workers</h1>
          <p>
            Empowering individuals with intellectual and developmental
            disabilities to reach their full potential
          </p>

          <button
            onClick={() => {
              routeProgramChange("/about");
            }}
          >
            Learn More
          </button>
        </div>

        <div className="banner">
         
            <div className="banner-two .hover-zoom">
              <button>
                <a
                  onClick={() => {
                    routeProgramChange("/programs");
                  }}
                >
                  <div className="program-banner ">
                    <h3>Programs</h3>

                    <p>
                      learn more about our programs and the valuable resources
                      that they provide
                    </p>
                  </div>
                </a>
              </button>
            </div>
       
            <div className="banner-one .hover-zoom">
              <button>
                <a
                  className="banner-button"
                  onClick={() => {
                    routeProgramChange("/");
                  }}
                >
                  <div className="donate-banner ">
                    <h3>About Us</h3>
                    <p>
                     Get to know what we are all about
                    </p>
                  </div>
                </a>
              </button>
            </div>
       
        </div>

        <div className="programs">
                

        <div className="Programs-item bus-info" ref={busRef}>

       

        <AnimatePresence initial={false}>

  {busInView && (
    <motion.div
      key="bus-animation"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="bus">
        <Bus
          className="bus-icon"
          width={"150px"}
          height={"150px"}
          fill="blue"
          onLoad={() => setIsBusLoaded(true)}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>

      <h3>PRIVATE TRANSPORTATION</h3>
      <p>
        We provide private transportation services to our clients at our
        adult regional center. Our reliable drivers are available
        Monday-Friday to transport clients to and from the center and
        other locations. Our service is designed to make getting around
        easy and stress-free for our clients.{" "}
      </p>
      <button
        onClick={() => {
          routeProgramChange("/programs");
        }}
      >
        Find out more
      </button>
    </div>
    <div className="Programs-item coach-info" ref={coachRef}>
    <AnimatePresence initial={false}>
  {!coachInView && (
    <motion.div
      key="coach-placeholder"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <CoachIcon
        className="coach-icon coach-placeholder"
        width={"150px"}
        height={"150px"}
        fill="blue"
      />
    </motion.div>
  )}
  {coachInView && (
    <motion.div
      key="coach-animation"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="coach">
        <CoachIcon
          className="coach-icon"
          width={"150px"}
          height={"150px"}
          fill="blue"
          onLoad={() => setIsCoachLoaded(true)}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>
  <h3>COMMUNITY INTEGRATION PROGRAM</h3>
  <p>
    Our community integration program promotes diversity, equality,
    and inclusion and provides resources and support for clients to
    learn about different lifestyles and advocate for themselves.
    The program helps clients lead independent lives within their
    communities.
  </p>
  <button
    onClick={() => {
      routeProgramChange("/programs");
    }}
  >
    Find out more
  </button>
</div>

<div className="Programs-item hands-info" ref={handsRef}>
 
<AnimatePresence initial={false}>

  {handsInView && (
    <motion.div
      key="hands-animation"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="hands">
        <HandsIcon
          className="hands-icon"
          width={"150px"}
          height={"150px"}
          fill="blue"
          onLoad={() => setIsHandsLoaded(true)}
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>
  <h3>SOCIAL RECREATION PROGRAM</h3>
  <p>
    Our social recreation program enhances the lives of adults with
    developmental disabilities through recreational and social
    activities such as arts and crafts, music, and other creative
    pursuits. Our program provides a supportive environment for
    individuals to engage in activities that promote well-being. It
    helps individuals lead fulfilling and enriching lives
  </p>
  <button
    onClick={() => {
      routeProgramChange("/programs");
    }}
  >
    Find out more
  </button>
</div>

        
        </div>

   
          <div className="sop-info">
            <div className="sop .col-md-">
              <div className="sop-wrap">
                <div className="sop-img " />
                <div className="sop-statement .col-md-">
                  <p className="sop-statement-title">Willing Workers</p>
                  <p className="sop-statement-text">
                    Our <br></br>Mission
                  </p>
                </div>
              </div>
              <div className="sop-quote .col-md-">
                <p>
                  At Willing Workers, our mission is to assist and support
                  individuals with intellectual and developmental disabilities
                  by promoting independence, self-advocacy, and overall
                  well-being through community integration training and the
                  development of healthy habits. We strive to improve the
                  quality of life for the individuals we serve by focusing on
                  areas such as safety, personal health and hygiene, nutrition,
                  physical fitness, and emergency preparedness. We believe in
                  the inherent worth and potential of every individual and are
                  committed to helping them lead fulfilling and independent
                  lives. Our goal is to empower them to reach their full
                  potential and become active members of their communities.
                </p>
              </div>
            </div>
          </div>
      

        <div className="last-quote">
          {/* <img src={Smileimg} alt="" className="src" /> */}
          <h4>Dedicated to making a difference in our community.</h4>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;

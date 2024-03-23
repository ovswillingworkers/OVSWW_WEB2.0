"use client";

import React, { useEffect } from "react";
// import styled from "styled-components";
import programsimg from "../../public/assets/blue_bg2(1).jpg";
import Image, { StaticImageData } from "next/image";
import "../../styles/global.scss";
import artsProgram from "../../public/assets/programs/art_program.jpg";
import behaviorTherapy from "../../public/assets/programs/behavior_therapy.jpeg";
import communication from "../../public/assets/programs/communication.jpg";
import lifeSkill from "../../public/assets/programs/life_skill.jpg";
import { Footer } from "../Footer";
// //import recreationalActivities from "../../public/assets/programs/recreational_activities.avif";
import recreational from "../../public/assets/programs/recreational.jpg";
import transportation from "../../public/assets/programs/transportation.jpg";
import Nav from "../Nav";
// import { Footer } from "./Footer";

const Programs = () => {
  const programs = [
    {
      name: "Behavioral Support Program",
      description:
        "Our Behavioral Support Program offers a path to mastering behavioral challenges, emphasizing the cultivation of social skills through professional guidance. Participants engage in crafting personalized behavior management plans, complemented by group activities and therapeutic sessions aimed at fostering coping strategies and enhancing communication abilities.",
      imageUrl: behaviorTherapy,
    },
    {
      name: "Creative Expression and Art Therapy Program",
      description:
        "Dive into the world of creativity with our Art Therapy Program, where adults rediscover their creative spark and emotional depth through art. With the support of art therapists and creative experts, participants explore a spectrum of artistic endeavors including painting, drawing, and sculpture, nurturing artistic talent and personal expression in a supportive environment.",
      imageUrl: artsProgram,
    },
    {
      name: "Communication and Language Development Program",
      description:
        "Enhance your communicative prowess with our Communication and Language Development Program, tailored for adults aiming to enrich their communication skills and vocabulary. Through personalized plans developed in collaboration with speech therapists and language specialists, participants engage in group sessions and activities designed to introduce new vocabulary and bolster social interaction skills.",
      imageUrl: communication,
    },
    {
      name: "Recreational Activities and Leisure Skills Development Program",
      description:
        "Our Recreational Program offers a plethora of engaging activities, from sports leagues to arts and crafts, and exhilarating outdoor adventures. Tailored to meet individual needs and interests, this program is your gateway to not only leisure and enjoyment but also to developing key leisure skills through specially curated events and trips.",
      imageUrl: transportation,
    },
    {
      name: "Life Skills and Independence Training Program",
      description:
        "Embark on a journey towards independence with our Life Skills Training Program, designed to empower adults with the essential skills for daily living. From budgeting and cooking to personal hygiene, participants receive comprehensive, hands-on training, laying the foundation for a confident and competent independent life.",
      imageUrl: lifeSkill,
    },
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Nav image={""} banner={""} />
      <div className="program-container">
        <div className="program-container-banner mt-4 p-5 bg-primary text-white">
          {/* <div className="layer"></div> */}
          <Image
            src={programsimg}
            alt="background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <h1>Programs</h1>
          <br></br>
        </div>
        <div className="program-description-container  p-5">
          <div className="program-description">
            <h1>Check out our Programs</h1>
            <p>
              Willing Workers empowers people with disabilities through training
              and healthy habits to achieve independence and well-being. We
              prioritize safety, health, nutrition, fitness, and emergency
              preparedness to improve quality of life.
            </p>
          </div>
        </div>

        <ul className="program-list">
          {programs.map((program) => (
            <li key={program.name}>
              <div className="program-card">
                <Image
                  src={program.imageUrl as StaticImageData}
                  sizes="100vw"
                  alt={program.name}
                />

                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </div>
  );
};

export default Programs;

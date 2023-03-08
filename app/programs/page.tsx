'use client'

import React, { useEffect } from "react";
// import styled from "styled-components";
import Programimg from "./assets/programs.jpg";
import Image from "next/image";
import '../../styles/global.scss';
import artsProgram from "../../public/assets/welcome.jpg";
// import behaviorTherapy from "../public/assets/programs/behavior_therapy.jpeg";
// import communication from "../public/assets/programs/communication.jpg";
// import lifeSkill from "../public/assets/programs/life_skill.jpg";
// //import recreationalActivities from '../src/assets/programs/recreational_activities.avif';
// //import recreational from '../src/assets/programs/recreational.jpg';
// import transportation from "../public/assets/programs/transportation.jpg";
// import { Footer } from "./Footer";

const Programs = () => {
  const programs = [
    {
      name: "Behavioral Support Program",
      description:
        "This program is designed to help adults manage their behavioral issues and improve their social skills. Participants will work with trained professionals to develop individualized behavior management plans, and will have the opportunity to participate in group activities and therapy sessions to help them learn new coping strategies and communication skills.",
    //   imageUrl: behaviorTherapy,
    },
    {
      name: "Creative Expression and Art Therapy Program",
      description:
        "This program is designed to help adults explore their creativity and emotions through various forms of art. Participants will have the opportunity to work with art therapists and other creative professionals to develop their artistic skills and self-expression, and will engage in a range of activities such as painting, drawing, sculpture, and more.",
      imageUrl: artsProgram,
    },
    {
      name: "Communication and Language Development Program",
      description:
        "This program is designed to help adults improve their communication skills and expand their vocabulary. Participants will work with speech therapists and other language specialists to develop personalized language development plans, and will have the opportunity to participate in group activities and therapy sessions to help them learn new words and improve their social interactions.",
    //   imageUrl: communication,
    },
    {
      name: "Recreational Activities and Leisure Skills Development Program",
      description:
        "This program is designed to provide adults with a range of fun and engaging activities to enjoy in their free time, while also helping them develop important leisure skills. Options may include sports leagues, arts and crafts classes, and outdoor adventures, as well as special events and trips. Activities will be tailored to the individual needs and abilities of each participant.",
    //   imageUrl: transportation,
    },
    {
      name: "Life Skills and Independence Training Program",
      description:
        "This program is designed to help adults develop the skills and knowledge needed to live independently and manage their daily tasks and responsibilities. Participants will have the opportunity to learn about a range of topics, including budgeting, cooking, and personal hygiene, and will receive hands-on training to help them build confidence and competence in these areas.",
    //   imageUrl: lifeSkill,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="program-container">
        <div className="program-container-banner mt-4 p-5 bg-primary text-white">
          <div className="layer"></div>
          <h1>Programs</h1>
          <br></br>
        </div>
        <div className="program-description-container  p-5">
          <div className="program-description">
            <h1>Check out our Programs</h1>
            <p>
              Willing Workers helps people with intellectual and developmental
              disabilities achieve independence, self-advocacy, and well-being
              through training and healthy habit development. We focus on
              safety, personal health and hygiene, nutrition, physical fitness,
              and emergency preparedness to improve quality of life. We believe
              in the worth and potential of every individual and are committed
              to helping them lead fulfilling, independent lives.
            </p>
            
            <Image src={artsProgram} alt="Arts Program" width={500} height={500} />

          </div>
        </div>

        <ul className="program-list">
          {programs.map((program) => (
            <li key={program.name}>
              <div className="program-card">
                {/* <Image src={program.imageUrl} alt={program.name} /> */}

                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Programs;

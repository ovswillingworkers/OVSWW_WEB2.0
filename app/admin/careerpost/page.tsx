"use client"
import { useState } from "react";
import Head from "next/head";
import "../../../styles/global.scss";
import axios from 'axios';
import { JobPosting } from "@/app/components/jobpost";
import { v4 as uuidv4 } from 'uuid';



export default function CreateJobPost() {
  const [jobPosting, setJobPosting] = useState<JobPosting>({
    id: "",
    title: "",
    location: "",
    salary: "",
    date: "",
    description: "",
    qualifications: [],
    contact: {
      name: "",
      email: "",
      phone: ""
    }
  });




  const [customQualifications, setCustomQualifications] = useState<Array<{ id: string; text: string }>>([]);

const addCustomQualification = () => {
  setCustomQualifications((prevQualifications) => [
    ...prevQualifications,
    { id: uuidv4(), text: '' },
  ]);
};

const handleCustomQualificationChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
  const { value } = event.target;
  setCustomQualifications((prevQualifications) =>
    prevQualifications.map((q) => (q.id === id ? { ...q, text: value } : q)),
  );
  handleQualificationsChange(event, id);
};

const handleQualificationsChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  customId?: string,
): void => {
  const { name, checked } = event.target;
  const qualification = customId || name;

  if (checked) {
    setJobPosting((prevState) => ({
      ...prevState,
      qualifications: [...prevState.qualifications, qualification],
    }));
  } else {
    setJobPosting((prevState) => ({
      ...prevState,
      qualifications: prevState.qualifications.filter((q) => q !== qualification),
    }));
  }
};

  // const handleQualificationsChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { name, checked } = event.target;
  //   if (checked) {
  //     setJobPosting(prevState => ({
  //       ...prevState,
  //       qualifications: [...prevState.qualifications, name]
  //     }));
  //   } else {
  //     setJobPosting(prevState => ({
  //       ...prevState,
  //       qualifications: prevState.qualifications.filter(q => q !== name)
  //     }));
  //   }
  // };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    if (name === "name" || name === "email" || name === "phone") {
      setJobPosting(prevState => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name]: value
        }
      }));
    } else {
      setJobPosting(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  try {
    const response = await axios.post("/api/addPost", jobPosting);
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      // Display a success message to the user
    } else {
      throw new Error("Error creating job post");
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
  }
};

return (
  <>
    <Head>
      <title>Create Job Post</title>
    </Head>
    <div className="career-container-banner mt-4 p-5 bg-primary text-white">
      <h1>Job Posting</h1>
      <p></p>
    </div>
    <div className="form-container">
      <h1>Create Job Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={jobPosting.title} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={jobPosting.location} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input type="text" id="salary" name="salary" value={jobPosting.salary} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={jobPosting.date} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={jobPosting.description} onChange={handleInputChange} required />
        </div>

        <div className="form-group qualification">
      <label htmlFor="qualifications">Qualifications:</label>
      <ul>
        <li>
          <input
            type="checkbox"
            id="high_school_diploma"
            name="High School Diploma"
            checked={jobPosting.qualifications.includes("High School Diploma")}
            onChange={handleQualificationsChange}
          />
          <label htmlFor="high_school_diploma">High School Diploma</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="some_college"
            name="Some College"
            checked={jobPosting.qualifications.includes("Some College")}
            onChange={handleQualificationsChange}
          />
          <label htmlFor="some_college">Some College</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="bachelor_degree"
            name="Bachelor's Degree"
            checked={jobPosting.qualifications.includes("Bachelor's Degree")}
            onChange={handleQualificationsChange}
          />
          <label htmlFor="bachelor_degree">Bachelor's Degree</label>
        </li>
        {customQualifications.map((customQualification) => (
          <li key={customQualification.id}>
            <div>
              <input
                type="checkbox"
                id={customQualification.id}
                name={customQualification.text}
                checked={jobPosting.qualifications.includes(customQualification.id)}
                onChange={(event) => handleQualificationsChange(event, customQualification.id)}
              />
              <input
                type="text"
                value={customQualification.text}
                onChange={(event) => handleCustomQualificationChange(event, customQualification.id)}
              />
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addCustomQualification}>
        Add More +
      </button>
    </div>



        <div className="form-group">
          <label htmlFor="name">Contact Name:</label>
          <input type="text" id="name" name="name" value={jobPosting.contact.name} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email:</label>
          <input type="email" id="email" name="email" value={jobPosting.contact.email} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
            <label htmlFor="phone">Contact Phone:</label>
            <input type="tel" id="phone" name="phone" value={jobPosting.contact.phone} onChange={handleInputChange} required />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

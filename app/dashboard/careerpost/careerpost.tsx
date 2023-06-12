"use client";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import "../../../styles/global.scss";
import axios from "axios";
import { JobPosting } from "@/app/components/jobpost";
import { v4 as uuidv4 } from "uuid";
import { addJobPost } from "@/app/api/addJobPosting";
import { toast } from "react-hot-toast";
import { clearJobPosting } from "@/app/redux/reducer/jobPostingsSlice";

export default function CreateJobPost(prop: any) {
  const textareaDescription = useRef<HTMLTextAreaElement | null>(null);
  const pacificTimezone = "en-US";
  const now = new Date();
  const expirationDate = new Date(now);

  expirationDate.setMonth(expirationDate.getMonth() + 1); // add 1 month

  useEffect(() => {
    if (textareaDescription.current) {
      textareaDescription.current.style.height = "auto"; // Reset height to auto to get the correct scrollHeight
      textareaDescription.current.style.height = `${textareaDescription.current.scrollHeight}px`; // Set the height to the content's scrollHeight
    }
  }, [textareaDescription.current?.value]);

  const deleteCustomQualification = (id: string) => {
    const customQualificationIndex = customQualifications.findIndex(
      (q) => q.id === id
    );
    const deletedCustomQualification =
      customQualifications[customQualificationIndex];
    const updatedCustomQualifications = [...customQualifications];
    updatedCustomQualifications.splice(customQualificationIndex, 1);
    setCustomQualifications(updatedCustomQualifications);
    setJobPosting((prevState) => ({
      ...prevState,
      qualifications: prevState.qualifications.filter(
        (q) => q !== deletedCustomQualification.id
      ),
    }));
  };

  const handleDeleteCustomQualification = (id: string) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this custom qualification?"
    );
    if (confirmDeletion) {
      deleteCustomQualification(id);
    }
  };

  const expirationDateString = expirationDate.toISOString().substr(0, 10); // convert to yyyy-mm-dd format

  const [savedCustomQualifications, setSavedCustomQualifications] = useState<
    Array<{ id: string; text: string }>
  >([]);

  const [jobPosting, setJobPosting] = useState<JobPosting>(() => ({
    id: "",
    title: "Behavior Coach",
    location: "Los Angeles",
    salary: "$15.00/hr",
    date: now.toISOString().substr(0, 10),
    description: "This is a test description",
    qualifications: [],
    contact: {
      name: "jay",
      email: "jay@gmail.com",
      phone: "2135465894",
    },
    expirationDate: expirationDateString,
  }));

  const [customQualifications, setCustomQualifications] = useState<
    Array<{ id: string; text: string; isSaved: boolean }>
  >([]);
  const [isCustomQualificationsSaved, setIsCustomQualificationsSaved] =
    useState<boolean>(false);

  const addCustomQualification = () => {
    setCustomQualifications((prevQualifications) => [
      ...prevQualifications,
      { id: uuidv4(), text: "", isSaved: false },
    ]);
  };

  const handleCustomQualificationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { value } = event.target;
    setCustomQualifications((prevQualifications) =>
      prevQualifications.map((q) => (q.id === id ? { ...q, text: value } : q))
    );
    handleQualificationsChange(event, id);
  };

  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    customId?: string
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
        qualifications: prevState.qualifications.filter(
          (q) => q !== qualification
        ),
      }));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    if (name === "name" || name === "email" || name === "phone") {
      setJobPosting((prevState) => ({
        ...prevState,
        contact: {
          ...prevState.contact,
          [name]: value,
        },
      }));
    } else if (name === "date") {
      const expirationDate = new Date(value);
      expirationDate.setMonth(expirationDate.getMonth() + 1); // add 1 month
      setJobPosting((prevState) => ({
        ...prevState,
        [name]: value,
        expirationDate: expirationDate.toISOString().substr(0, 10), // convert to yyyy-mm-dd format
      }));
    } else {
      setJobPosting((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSaveCustomQualification = (id: string) => {
    const qualification = customQualifications.find(
      (customQualification) => customQualification.id === id
    );
    if (qualification && qualification.text) {
      setSavedCustomQualifications((prevQualifications) => [
        ...prevQualifications,
        qualification,
      ]);
      setCustomQualifications((prevQualifications) =>
        prevQualifications.map((customQualification) =>
          customQualification.id === id
            ? { ...customQualification, isSaved: true }
            : customQualification
        )
      );
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const postId = uuidv4(); // generate a unique ID
    const jobPostingWithId = { ...jobPosting, id: postId }; // add the ID to the jobPosting object
    addJobPost(jobPostingWithId);
    dispatch(clearJobPosting()); // add this line
    prop.onClick("all-job-posting");
  };

  return (
    <>
   <div className="">

        <p>
          
          Create Job Post
          </p>
   </div>
   
      {/* <div className="career-container-banner mt-4 p-5 bg-primary text-white">
      <h1>Job Posting</h1>
      <p></p>
    </div> */}
      <div className="form-container">
        <div className="form-container-content">
          <h1>Create Job Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input
                type="text"
                id="salary"
                name="salary"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group job-description">
              <label htmlFor="description">Description:</label>
              <textarea
                ref={textareaDescription}
                id="description"
                name="description"
                className="description"
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>

            <div className="form-group qualification">
              <label htmlFor="qualifications">Qualifications:</label>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="high_school_diploma"
                    name="High School Diploma"
                    checked={jobPosting.qualifications.includes(
                      "High School Diploma"
                    )}
                    onChange={handleQualificationsChange}
                  />
                  <label htmlFor="high_school_diploma">
                    High School Diploma
                  </label>
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
                    checked={jobPosting.qualifications.includes(
                      "Bachelor's Degree"
                    )}
                    onChange={handleQualificationsChange}
                  />
                  <label htmlFor="bachelor_degree">Bachelor's Degree</label>
                </li>
                {customQualifications.map((customQualification) => {
                  if (customQualification.isSaved) {
                    return (
                      <li key={customQualification.id}>
                        <input
                          type="checkbox"
                          id={customQualification.id}
                          name={customQualification.text}
                          checked={jobPosting.qualifications.includes(
                            customQualification.id
                          )}
                          onChange={(event) =>
                            handleQualificationsChange(
                              event,
                              customQualification.id
                            )
                          }
                        />
                        <label htmlFor={customQualification.id}>
                          {customQualification.text}
                        </label>
                        <button
                          type="button"
                          className="delete"
                          onClick={() =>
                            handleDeleteCustomQualification(
                              customQualification.id
                            )
                          }
                        >
                          X
                        </button>
                      </li>
                    );
                  } else {
                    return (
                      <li key={customQualification.id}>
                        <div>
                          <input
                            type="checkbox"
                            id={customQualification.id}
                            name={customQualification.text}
                            checked={jobPosting.qualifications.includes(
                              customQualification.id
                            )}
                            onChange={(event) =>
                              handleQualificationsChange(
                                event,
                                customQualification.id
                              )
                            }
                          />
                          <input
                            type="text"
                            onChange={(event) =>
                              handleCustomQualificationChange(
                                event,
                                customQualification.id
                              )
                            }
                          />
                          <button
                            type="button"
                            className="checkbox-newcustomButton save"
                            onClick={() =>
                              handleSaveCustomQualification(
                                customQualification.id
                              )
                            }
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="checkbox-newcustomButton delete"
                            onClick={() =>
                              handleDeleteCustomQualification(
                                customQualification.id
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
              <button type="button" onClick={addCustomQualification}>
                Add More +
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="name">Contact Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Contact Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Contact Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

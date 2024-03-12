//import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface JobPosting {
  title: string;
  location: string;
  salary: string;
  date: string;
  expirationDate?: string;
  description: string;
  qualifications: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface EditJobPostProps {
  prop: JobPosting;
  setSelectedOption: (selectedOption: string) => void;
}

export default function JobPostingEditor({
  prop,
  setSelectedOption,
}: EditJobPostProps) {
  const textareaDescription = useRef<HTMLTextAreaElement | null>(null);
  const now = new Date();
  const expirationDate = new Date(now);
  expirationDate.setMonth(expirationDate.getMonth() + 1); // add 1 month

  useEffect(() => {
    if (textareaDescription.current) {
      textareaDescription.current.style.height = "auto";
      textareaDescription.current.style.height = `${textareaDescription.current.scrollHeight}px`;
    }
  }, [textareaDescription.current?.value]);

  const [jobPosting, setJobPosting] = useState<JobPosting>(() => ({
    ...prop,
    date: prop.date || now.toISOString().substr(0, 10),
    expirationDate: prop.expirationDate || expirationDate.toISOString().substr(0, 10),
    qualifications: prop.qualifications || [],
    contact: prop.contact || {
      name: "",
      email: "",
      phone: "",
    },
  }));

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
    } else {
      setJobPosting((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = event.target;
    if (checked) {
      setJobPosting((prevState) => ({
        ...prevState,
        qualifications: [...prevState.qualifications, name],
      }));
    } else {
      setJobPosting((prevState) => ({
        ...prevState,
        qualifications: prevState.qualifications.filter((q) => q !== name),
      }));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/editPost", jobPosting);
      if (response.status === 200) {
        setSelectedOption("all-job-posting");
        toast.success("Edit has been saved");
      } else {
        toast.error("Error saving");
        throw new Error("Error creating job post");
      }
    } catch (error) {
      toast.error("Error saving");
      console.error(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-container-content">
          <h2>Edit Job Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobPosting.title}
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
                value={jobPosting.location}
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
                value={jobPosting.salary}
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
                value={jobPosting.date}
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
                value={jobPosting.expirationDate || ""}
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
                value={jobPosting.description}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>

            <div className="form-group qualification">
              <label>Qualifications:</label>
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
              </ul>
            </div>

            <div className="form-group">
              <label htmlFor="name">Contact Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={jobPosting.contact.name}
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
                value={jobPosting.contact.email}
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
                value={jobPosting.contact.phone}
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

"use client";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import "../../../styles/global.scss";
import axios from "axios";
import { JobPosting } from "@/app/components/jobpost";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { error } from "console";
import { RootState } from "@/app/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearJobPosting } from "@/app/redux/reducer/jobPostingsSlice";

type SetSelectedOption = (selectedOption: string) => void;

interface EditJobPostProps {
  prop: JobPosting;
  setSelectedOption: SetSelectedOption;
}

export default function JobPostingEditor({
  prop,
  setSelectedOption,
}: EditJobPostProps) {
  const dispatch = useDispatch();

  const someData = useSelector((state: RootState) => state.users);

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
    ...prop, // set the initial value of jobPosting to the prop passed to the component
    date: prop.date || now.toISOString().substr(0, 10), // if prop.date is undefined, use current date
    expirationDate: prop.expirationDate || expirationDateString, // if prop.expirationDate is undefined, use 1 month from now
    qualifications: prop.qualifications || [],
    contact: prop.contact || {
      name: "",
      email: "",
      phone: "",
    },
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
    const postId = jobPosting.id; // generate a unique ID
    const jobPostingWithId = { ...jobPosting, id: postId }; // add the ID to the jobPosting object

    try {
      // const response = await axios.post("/api/editPost", jobPostingWithId);
      const response = await axios.post("/api/editPost", jobPostingWithId);
      if (response.status === 200) {
        const data = response.data;

        setSelectedOption("all-job-posting");
        dispatch(clearJobPosting()); // add this line
        toast.success("Edit has been saved ");

        // Display a success message to the user
      } else {
        toast.error("Error saving ");
        throw new Error("Error creating job post");
      }
    } catch (error) {
      toast.error("Error saving ");
      console.error(error);
      // Display an error message to the user
    }
  };

  return (
    <>
      {/* <div className="career-container-banner mt-4 p-5 bg-primary text-white">
      <h1>Job Posting</h1>
      <p></p>
    </div> */}
      <div className="form-container">
        <div className="form-container-content">
          <h2>Edit Job Post</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={jobPosting.title}
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
                value={jobPosting.location}
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
                value={jobPosting.salary}
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
                value={jobPosting.date}
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
                value={jobPosting.expirationDate || ""}
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
                value={jobPosting.description}
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
                            value={customQualification.text}
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
                value={jobPosting.contact.name}
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
                value={jobPosting.contact.email}
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
                value={jobPosting.contact.phone}
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

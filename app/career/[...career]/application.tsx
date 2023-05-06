"use client";
import { Button, Form, Input, Upload } from "antd";
import "../../../styles/global.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { sendJobApplicationEmail } from "./sendEmail";
import toast from "react-hot-toast";
import axios from "axios";
import { Footer } from "@/app/Footer";
import Nav from "@/app/Nav";
import { redirect } from "next/navigation";
import { JobPosting } from "@/app/components/jobpost";

interface IProps {
  params: {
    career: string;
  };
  searchParams: {};
}

const Application = (props: {
  jobPosting: JobPosting;
  applyToJobPosting: (isApplying: boolean, jobPosting?: JobPosting) => void;
}) => {
  const [valid, setValid] = useState(false);
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });
  const formData = new FormData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "coverLetter") {
      setMessage(value);
    }
  }

  function handleFileChange(info: any) {
    const file = info.file;

    const isPdfOrDocx =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isSizeUnderLimit = file.size / 1024 / 1024 < 5; // 5 MB limit
    if (!isPdfOrDocx) {
      info.onError(new Error("Only PDF or DOCX files are allowed."));
    } else if (!isSizeUnderLimit) {
      info.onError(new Error("File size must be less than 5MB."));
    } else {
      setValues((prevValues: any) => ({
        ...prevValues,
        resume: { originFileObj: file.originFileObj, name: file.name },
      }));
    }
    return false; // Prevent Ant Design from automatically uploading the file
  }

  function handleBeforeUpload(file: any) {
    setValues((prevValues: any) => ({ ...prevValues, resume: null }));
    return true; // Allow the file to be uploaded
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Add form values to formData object
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.coverLetter);
    if (values.resume) {
      formData.append("resume", values.resume.originFileObj);
    }

    try {
      const response = await axios.post("/api/sendEmail", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });

      setStatus(response.data);
      setName("");
      setEmail("");
      setMessage("");
      setValid(true);
      toast.success("Application has been submitted");
      props.applyToJobPosting(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button ref={sectionRef} onClick={() => props.applyToJobPosting(false)}>
        Back
      </Button>{" "}
      <div className="job-application-form">
        <div className="application-jobpost">
          <h3>Job Title: {props.jobPosting.title}</h3>
          <h4>Location: {props.jobPosting.location}</h4>
          <h4>Salary: {props.jobPosting.salary}</h4>
          <h4>Job Description:{props.jobPosting.description}</h4>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name." }]}
          >
            <Input name="name" value={values.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email." }]}
          >
            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number." },
            ]}
          >
            <Input
              name="tel"
              type="tel"
              value={values.phone}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Cover Letter"
            name="coverLetter"
            rules={[
              { required: true, message: "Please enter your cover letter." },
            ]}
          >
            <Input.TextArea
              name="coverLetter"
              value={values.coverLetter}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Resume"
            name="resume"
            rules={[{ required: true, message: "Please upload your resume." }]}
          >
            <Upload
              accept=".pdf,.docx"
              beforeUpload={handleBeforeUpload}
              onChange={handleFileChange}
              fileList={values.resume ? [values.resume] : []}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!values.resume}>
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Application;

'use client'
import { Button, Form, Input, Upload } from "antd";
import "../../../styles/global.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { sendJobApplicationEmail } from "./sendEmail";
import toast from "react-hot-toast";
import axios from "axios";
import { Footer } from "@/app/Footer";
import Nav from "@/app/Nav";
import { redirect } from "next/navigation";




interface IProps {
  params: {
    career: string;
  };
  searchParams: {};
}

const Application = () => {
  const [valid, setValid] = useState(false)
  const [values, setValues] = useState<any>({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');


  useEffect(() => {
    if (valid){
      redirect('/career')
    }
      
 }, [valid]);



 function testing(){
  console.log("SPEAK NOTHJING")// 

 // redirect('/career')
}

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
  }

  function handleFileChange(info: any) {
    const file = info.file;
    const isPdfOrDocx = file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isSizeUnderLimit = file.size / 1024 / 1024 < 5; // 5 MB limit
    if (!isPdfOrDocx) {
      info.onError(new Error("Only PDF or DOCX files are allowed."));
    } else if (!isSizeUnderLimit) {
      info.onError(new Error("File size must be less than 5MB."));
    } else {
      setValues((prevValues: any) => ({ ...prevValues, resume: file }));
    }
    return false; // Prevent Ant Design from automatically uploading the file
  }
  
  function handleBeforeUpload(file: any) {
    setValues((prevValues: any) => ({ ...prevValues, resume: null }));
    return true; // Allow the file to be uploaded
  }

  // function handleFileChange(info: any) {
  //   const file = info.file;
  //   const isPdfOrDocx = file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  //   const isSizeUnderLimit = file.size / 1024 / 1024 < 5; // 5 MB limit
  //   if (!isPdfOrDocx) {
  //     info.onError(new Error("Only PDF or DOCX files are allowed."));
  //   } else if (!isSizeUnderLimit) {
  //     info.onError(new Error("File size must be less than 5MB."));
  //   } else {
  //     setValues((prevValues: any) => ({ ...prevValues, resume: file }));
  //   }
  // }


  function handleFormValues(values: any) {
    setEmail(values.email);
    setName(values.name);
    setMessage(values.message);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    handleFormValues(e);
   console.log( email, name, message, " THIS IS ALL THE TEXT")
   console.log( e, " THIS IS ALL THE TEXT")
    try {
      const response = await axios.post('/api/sendEmail', {
      name: e.name as string,
      email: e.email as string,
      message: e.coverLetter as string
      });
  
      setStatus(response.data);
      setName('');
      setEmail('');
      setMessage('');
      toast.success("Application has been sumbitted");
      setValid(true)
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }


   
  };
  


  return (
    <>
    <Nav image={""} banner={""} />
    <div className="career">
      <div className="career-container-banner mt-4 p-5 bg-primary text-white">
        <h1>Career</h1>
        <p></p>
      </div>


        <div className="career-text">
        <h1>Join our team today</h1>
  <h5 style={{}}>
    At Willing Workers, we are always looking for dedicated individuals to join our team. 
    We offer competitive salaries, comprehensive benefits, and opportunities for growth and advancement. 
    Come visit us for a tour to see what we're all about and start your career with us today!
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
        <div className="job-application-form">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name." }]}>
          <Input value={values.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email." }]}>
          <Input type="email" value={values.email} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter your phone number." }]}>
          <Input type="tel" value={values.phone} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Cover Letter" name="coverLetter" rules={[{ required: true, message: "Please enter your cover letter." }]}>
          <Input.TextArea value={values.coverLetter} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Resume" name="resume" rules={[{ required: true, message: "Please upload your resume." }]}>
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
          <Button type="primary" htmlType="submit" disabled={!values.resume}>Submit Application</Button>
        </Form.Item>
      </Form>
    </div>


  
      
      <Footer />
    </div>
      


    </>
  );
};

export default Application;

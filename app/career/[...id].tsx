'use client
'
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";

interface JobApplicationFormValues {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
}

function JobApplicationForm() {
  const [values, setValues] = useState<JobApplicationFormValues>({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const router = useRouter();
  const { id } = router.query;

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function handleSubmit(values: JobApplicationFormValues) {
    // Send form data to server or external API
  }

  return (
    <div className="job-application-form">
      <h1>Apply for Job Posting #{id}</h1>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit Application</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default JobApplicationForm;

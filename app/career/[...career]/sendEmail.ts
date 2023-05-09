import sgMail from "@sendgrid/mail";
import axios from "axios";
import toast from "react-hot-toast";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
interface IJobApplication {
<<<<<<< HEAD
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    jobpost_id: string;
    resume : File;
   
  }
  
  
  export async function sendJobApplicationEmail({ name, email, coverLetter, jobpost_id}: IJobApplication): Promise<void> {
    try {
      const response = await axios.post('/api/sendEmail', {
=======
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File;
}

export async function sendJobApplicationEmail({
  name,
  email,
  coverLetter,
}: IJobApplication): Promise<void> {
  try {
    const response = await axios.post("/api/sendEmail", {
>>>>>>> 1017af4611744128b8eaa8e0e386cefee28c9d84
      name: name as string,
      email: email as string,
      message: coverLetter as string,
    });

    toast.success("Application has been sumbitted");
  } catch (error: any) {
    console.error(error.message);
    toast.error(error.message);
  }
}

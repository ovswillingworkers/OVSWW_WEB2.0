
import sgMail from "@sendgrid/mail";
import axios from "axios";
import multer, { Multer } from "multer";
import toast from "react-hot-toast";




sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
interface IJobApplication {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    resume : File;
   
  }
  
  
  export async function sendJobApplicationEmail({ name, email, coverLetter}: IJobApplication): Promise<void> {
    try {
      const response = await axios.post('/api/sendEmail', {
      name: name as string,
      email: email as string,
      message: coverLetter as string
      });

      toast.success("Application has been sumbitted");
     
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }
  
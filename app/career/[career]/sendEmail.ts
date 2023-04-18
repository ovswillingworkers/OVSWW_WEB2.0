
import sgMail from "@sendgrid/mail";
import multer, { Multer } from "multer";




sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
interface IJobApplication {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
   
  }
  
  
  export async function sendJobApplicationEmail({ name, email, phone, coverLetter}: IJobApplication): Promise<void> {
    try {
      // Create the email message
      const msg = {
        to: "jayceexxiii@gmail.com",
        from: "jacks23.cee@gmail.com",
        subject: "Job Application",
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Cover Letter: ${coverLetter}
        `,
        
      };
  
      // Send the email using SendGrid
      await sgMail.send(msg);
    } catch (error) {
      throw new Error("Failed to send job application email.");
    }
  }
  
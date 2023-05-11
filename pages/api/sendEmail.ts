import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { File } from "formidable";
import prisma from "@/prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

function isFile(obj: any): obj is File {
  return "filepath" in obj && "originalFilename" in obj && "mimetype" in obj;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const sgEmail = process.env.SENDGRID_API_EMAIL as string;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const form = new formidable.IncomingForm();

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(500).send("Error sending message.");
        return;
      }

      const { name, email, message, id } = fields;
      console.log(id)
      const jobpost = await getJobpost(id as string)

      
      // Use a type guard to check if 'files.resume' is a 'File'
      const resumeFile = files.resume as File;
      if (!isFile(resumeFile)) {
        console.error("Invalid resume file:", resumeFile);
        res.status(400).send("Invalid resume file.");
        return;
      }

      const fs = require("fs");
      const resumeContent = fs
        .readFileSync(resumeFile.filepath)
        .toString("base64");

      const emailTemplate = `Job Title: 
Salary: 
Location:

Contact Information:
Name: ${name}
Email: ${email}
Phone Number: ${fields.phone}

Cover Letter:
${message}

We will carefully review your application and get in touch with you if we feel you have the necessary skills and experience to move forward in the hiring process. Please note that due to the high volume of applications we receive, we may not be able to respond to each applicant individually.

Thank you for taking the time to apply for this position. We appreciate your interest in our company and wish you the best of luck in your job search.

Best regards,
[Company Name]`;

      const msg = {
        to: sgEmail as string,
        from: sgEmail as string,
        subject: `Job Application for ` as string,
        text: emailTemplate,
        attachments: [
          {
            content: resumeContent,
            filename: resumeFile.originalFilename as string,
            type: resumeFile.mimetype as string,
            disposition: "attachment" as string,
          },
        ],
      };

      try {
        console.log(msg)
     //   const result = await sgMail.send(msg);
        res.status(200).send("Message sent successfully.");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error sending message in sendgrid.");
      }
    });
  } catch (err) {
    console.error("Error parsing form:", err);
    res.status(500).send("Error sending message.");
    return;
  }
};

const getJobpost = async (id: string) => {
  const jobPost = await prisma.jobPosting.findFirst({
    where: {
      id,
    },
    include: {
      contact: true,
    },
  });
console.log(jobPost, " GET JOB POST FUNC")
  return jobPost;
};

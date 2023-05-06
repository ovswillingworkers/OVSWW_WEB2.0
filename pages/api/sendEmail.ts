import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { Request, Response } from "express";
import { File } from "formidable";

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

      const { name, email, message } = fields;

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

      const msg = {
        to: sgEmail as string,
        from: sgEmail as string,
        subject: `Job Application for ${name} ` as string,
        text: message as string,
        html: `<p>${message}  || ${email}</p>` as string,
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
        const result = await sgMail.send(msg);

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

import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const sgEmail= process.env.SENDGRID_API_EMAIL as string
console.log(process.env.SENDGRID_API_KEY as string, " sendgrid api code")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  console.log(process.env.SENDGRID_API_EMAIL as string, " sendgrid api code")

const form = new formidable.IncomingForm();

try {
  form.parse(req,  async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      res.status(500).send('Error sending message.');
      return;
    }

    console.log("Parsed fields:", fields);
    console.log("THIS IS UPLOADED FILE?", files)
    console.log("THIS IS resume", files.resume.path)

    const sgEmail= process.env.SENDGRID_API_EMAIL as string
    console.log(process.env.SENDGRID_API_KEY as string, " sendgrid api code")
      sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
      console.log(process.env.SENDGRID_API_EMAIL as string, " sendgrid api code")
      const { name, email, message } = fields;
    

      const fs = require('fs');
      const resumeContent = fs.readFileSync(files.resume.filepath).toString('base64');
      

      const msg = {
        to: sgEmail, // replace with your own email address
        from: sgEmail,
        subject: `Job Application for ${name}`,
        text: message as string,
        html: `<p>${message}  || ${email}</p>`,
        attachments: [
          {
            content: resumeContent,
            filename: files.resume.originalFilename,
            type: files.resume.mimetype,
            disposition: 'attachment',
            
          }
        ],
      };

     
    try {
      console.log(msg)
    const result = await sgMail.send(msg);
    console.log(result);
    console.log("Message was sent")
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message in sendgrid.');
  }

  });

  
} catch (err) {
  console.error("Error parsing form:", err);
  res.status(500).send('Error sending message.');
  return;
}


};

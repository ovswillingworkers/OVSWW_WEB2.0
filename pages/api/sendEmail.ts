import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const sgEmail= process.env.SENDGRID_API_EMAIL as string
console.log(process.env.SENDGRID_API_KEY as string, " sendgrid api code")
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  console.log(process.env.SENDGRID_API_EMAIL as string, " sendgrid api code")
  const { name, email, message } = req.body;

  const msg = {
    to: sgEmail, // replace with your own email address
    from: sgEmail,
    subject: `Job Application for ${name}`,
    text: message,
    html: `<p>${message}  || ${email}</p>`,
  };
  

  console.log(msg)
  res.status(200).send('Message sent successfully.');
  // try {
  //   await sgMail.send(msg);
  //   res.status(200).send('Message sent successfully.');
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error sending message.');
  // }
};

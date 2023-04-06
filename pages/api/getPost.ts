// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse



// ) {
//   if (req.method === "GET") {
//     const jobPostings = [
//       {
//         id: "1",
//         title: "Life Skills Coach",
//         location: "Los Angeles, CA",
//         salary: "$40,000 - $50,000",
//         date: "March 15, 2023",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         qualifications:
//           "Bachelor's degree in Social Work, Psychology, or related field. 2+ years of experience working with individuals with developmental disabilities.",
//         contact: {
//           name: "John Doe",
//           email: "johndoe@example.com",
//           phone: "555-555-5555",
//         },
//       },
//       {
//         id: "2",
//         title: "Behavioral Support Specialist",
//         location: "New York, NY",
//         salary: "$45,000 - $55,000",
//         date: "April 1, 2023",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         qualifications:
//           "Bachelor's degree in Psychology, Social Work, or related field. 2+ years of experience working with individuals with challenging behaviors.",
//         contact: {
//           name: "Jane Smith",
//           email: "janesmith@example.com",
//           phone: "555-555-5555",
//         },
//       },
//       {
//         id: "3",
//         title: "Art Therapist",
//         location: "Chicago, IL",
//         salary: "$50,000 - $60,000",
//         date: "May 1, 2023",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         qualifications:
//           "Master's degree in Art Therapy or related field. 2+ years of experience working with individuals with mental disabilities.",
//         contact: {
//           name: "Bob Johnson",
//           email: "bobjohnson@example.com",
//           phone: "555-555-5555",
//         },
//       },
//       {
//         id: "4",
//         title: "Recreational Therapist",
//         location: "San Francisco, CA",
//         salary: "$55,000 - $65,000",
//         date: "June 1, 2023",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         qualifications:
//           "Bachelor's degree in Recreation Therapy or related field. 2+ years of experience working with individuals with mental disabilities.",
//         contact: {
//           name: "Alice Lee",
//           email: "alicelee@example.com",
//           phone: "555-555-5555",
//         },
//       },
//       {
//         id: "5",
//         title: "Job Coach",
//         location: "Seattle, WA",
//         salary: "$30,000 - $40,000",
//         date: "July 1, 2023",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//         qualifications:
//           "Bachelor's degree in Business or related field. 5+ years of experience in product management.",
//         contact: {
//           name: "Sarah Johnson",
//           email: "sarahjohnson@example.com",
//           phone: "555-555-5555",
//         },
//       }
//     ]  

//     res.status(200).json(jobPostings); // send the job postings as a JSON response
//   } else {
//     res.status(405).send("Method not allowed"); // send an error response for unsupported HTTP methods
//   }
// }


import prisma from "../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET") {
    // getJobPosts
    try {
      const jobPosts = await prisma.jobPosting.findMany({
        include: {
          contact: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(jobPosts);
    } catch (err) {
      res.status(403).json({ err: "Error while fetching data" });
    }
  }
}

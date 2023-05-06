// import axios from "axios";
// import { JobPosting } from "../components/jobpost";

// export default async function getJobPostings() {
//   try {
//     const res = await axios.get("/api/getPost");
//     const data = res.data;
//     return data as JobPosting[]; // cast the response data to an array of JobPosting objects
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

import axios from "axios";
import { JobPosting } from "../components/jobpost";

export default async function getJobPostings() {
  try {
    const res = await axios.get("/api/getPost");
    const data = res.data;

    const jobPostings: JobPosting[] = data.map((postingData: any) => {
      const jobPosting: JobPosting = {
        id: postingData.id,
        title: postingData.title,
        description: postingData.description,
        location: postingData.location,
        date: postingData.date,
        salary: postingData.salary,
        qualifications: postingData.qualifications,
        contact: postingData.contact,
        expirationDate: postingData.expirationDate,
      };
      return jobPosting;
    });

    return jobPostings;
  } catch (error) {
    console.error(error);
    return false;
  }
}

import axios from "axios";
import { JobPosting } from "../components/jobpost";


export default async function getJobPostings() {
  try {
    const res = await axios.get("/api/getPost");
    const data = res.data;
    return data as JobPosting[]; // cast the response data to an array of JobPosting objects
  } catch (error) {
    console.error(error);
    return []; 
  }
}


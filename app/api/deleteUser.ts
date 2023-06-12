import axios from "axios";
import { JobPosting } from "../components/jobpost";

// Existing getJobPostings function

export async function deleteUser(id: string) {
  try {
    const res = await axios.post("/api/deleteUser", {
      data: {  id },
 
    });
    
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete the job post");
  }
}

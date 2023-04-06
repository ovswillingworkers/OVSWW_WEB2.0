

    import axios from "axios";
import { JobPosting } from "../components/jobpost";
import toast from "react-hot-toast";

// Existing getJobPostings function

export async function addJobPost(jobPostingWithId: JobPosting) {
    try {
        const response = await axios.post("/api/addPost", jobPostingWithId);
        if (response.status === 200) {
          const data = response.data;
        
          toast.success("Job Post has been created")

          // Display a success message to the user
        } else {
          throw new Error("Error creating job post");
        }
      } catch (error) {
        console.error(error);
        toast.success("Error adding Job Post")
        // Display an error message to the user
      }
  
}

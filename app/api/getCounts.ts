import axios from "axios";

export async function getCounts() {
  try {
    const res = await axios.get("/api/getCounts");
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get counts");
  }
}
"use client";
import "../../styles/global.scss";
import { Provider } from "react-redux";
import { appStore } from "../redux/store/store";
import CareerList from "./careerlist";

function Career() {
  // const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <Provider store={appStore}>
      <CareerList />
    </Provider>
  );
}

export default Career;

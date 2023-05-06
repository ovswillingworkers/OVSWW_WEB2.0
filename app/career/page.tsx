"use client";

import { useEffect, useState } from "react";
import "../../styles/global.scss";
import { Footer } from "../Footer";
import Link from "next/link";
import { JobPosting } from "../components/jobpost";
import Nav from "../Nav";
import getJobPostings from "../api/getJobPostings";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setJobPosting } from "../redux/reducer/jobPostingsSlice";
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

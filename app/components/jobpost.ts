export interface JobPosting {
    id: string;
    title: string;
    location: string;
    salary: string;
    date: string;
    description: string;
    qualifications: string[];
    contact: {
      name: string;
      email: string;
      phone: string;
    }
  }
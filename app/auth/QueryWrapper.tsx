"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
// import getUser from '../api/getUser'

interface Props {
  children?: ReactNode;
  session?: any; // Replace 'any' with the type of your session object
}

const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;

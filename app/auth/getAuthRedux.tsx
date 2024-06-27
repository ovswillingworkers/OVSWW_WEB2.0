"use client";
import { getSession } from "next-auth/react";
import { User } from "../components/user";


export default async function useAuthRedux({ user = "" }: any) {
  let validate = false;

  if (!user) {
    const session = await getSession();
    if (session) {
      const user_return = session.user as User;

      return user_return;
    }
  } else {
    validate = false;
  }

  return validate;
}

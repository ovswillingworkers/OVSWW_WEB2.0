"use client";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { User } from "../components/user";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../api/getUser";
import { Session } from "@auth0/nextjs-auth0";

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

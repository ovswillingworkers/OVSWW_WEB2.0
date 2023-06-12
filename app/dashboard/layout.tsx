import { redirect } from "next/navigation";
import QueryWrapper from "../auth/QueryWrapper";
import adminbanner from "../../public/assets/admin.jpg";
import AdminNav from "./adminNav";
import React from "react";
import AdminSession from "./adminsession";
import { getUser } from "../api/getUser";

import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import getAuth from "../auth/getAuth";
import useAuthRedux from "../auth/getAuthRedux";
import { getServerSession } from "next-auth";

export default async function layout({ children }: { children: any }) {
  const session = await AdminSession();

  if (!session) {
    redirect("/admin");
  }

  return (
    <>
      <AdminNav
        image={session.user?.image as string}
        banner={adminbanner.src}
        email={session.user?.email || ""}
      />

      {children}
    </>
  );
}

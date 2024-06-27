import { redirect } from "next/navigation";
import adminbanner from "../../public/assets/admin.jpg";
import AdminNav from "./adminNav";
import React from "react";
import AdminSession from "./adminsession";


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

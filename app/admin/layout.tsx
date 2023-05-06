import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import QueryWrapper from "../auth/QueryWrapper";
import AdminSession from "../dashboard/adminsession";

export default async function layout({ children }: { children: any }) {
  const session = await AdminSession();
  if (session) {
    redirect("/dashboard");
  }

  return <QueryWrapper session={session || ""}>{children}</QueryWrapper>;
}

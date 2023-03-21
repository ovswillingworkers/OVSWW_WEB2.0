
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import Nav from "../Nav";
import Login from "../auth/Login";
import Logged from "../auth/Logged";


import { redirect } from "next/navigation";

export default async function Admin() {
  // const [loading, setLoading] = useState(false);
  const session = await getServerSession(authOptions)

  // useEffect(() => {
  //   async function fetchSession() {
  //     setLoading(true);
  //     const session = await getServerSession(authOptions);
  //     setSession(session);
  //     setLoading(false);
  //   }

  //   fetchSession();
  // }, []);



      if (session?.user) {
       redirect("/admin/dashboard");
      }


  return (
    <div>
      <div className="career-container-banner mt-4 p-5 bg-primary text-white">
        <h1>Admin</h1>
        <p></p>
      </div>
      <div className="admin-container">
        <ul className="flex items-center gap-6">
     
  {!session?.user && <Login />}


        </ul>
      </div>
    </div>
  );
}

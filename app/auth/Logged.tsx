import Image from "next/image";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Space } from "antd";
import Userimage from "./Userimage";

function Logged() {
  return (
    <div className="logged flex flex-col gap-8 items-center">
      <Space wrap>
        <Button onClick={() => signOut()} type="primary" danger>
          Signout
        </Button>
      </Space>
    </div>
  );
}
export default Logged;

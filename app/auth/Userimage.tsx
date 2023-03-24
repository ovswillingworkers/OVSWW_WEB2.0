import React, { useRef, useState } from 'react';

import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme , Breadcrumb,} from 'antd';
import Image from "next/image"
import Logged from '@/app/auth/Logged';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { Session } from 'next-auth/';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { getSession, GetSessionParams } from 'next-auth/react';

type User = {
  image: string;
};

interface UserimageProps {
  user: User;
}

const { Header, Content, Sider } = Layout;

export default function Userimage({ user }: UserimageProps): JSX.Element {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState('user');
  const userContentRef = useRef(null);
  const jobPostingContentRef = useRef(null);

  const handleOptionClick = (event: any) => {
    const selectedValue = event.key;
    setSelectedOption(selectedValue);
  };

  return (
    <>
      <Image
        className="w-14 rounded-full"
        width={100}
        height={100}
        src={ ''}
        alt=""
        priority
      />
    </>
  );
}

export const getServerSideProps = async (context: GetSessionParams | undefined) => {
  const session = await getSession(context);
  console.log(session, "THIS IS THE SESSION")
  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        image: session.user?.image || '',
      },
    },
  };
};

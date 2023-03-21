
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import QueryWrapper from '../auth/QueryWrapper'
import { Suspense } from 'react'
import Login from '../auth/Login'


function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="admin-layout">
   
        <QueryWrapper>
           
          {children}

      
        </QueryWrapper>
    </div>
  )
}

export default Layout

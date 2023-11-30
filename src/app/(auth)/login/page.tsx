import React from 'react'
import LoginForm from '@/app/(auth)/login/components/LoginForm'
import PageCard from '@/components/Page/PageCard'
import { LuLogIn } from 'react-icons/lu'

const Page = () => {
  return (
    <div>
      <PageCard icon={LuLogIn} title="Login" description="Pagina login">
        <LoginForm />
      </PageCard>
    </div>
  )
}

export default Page

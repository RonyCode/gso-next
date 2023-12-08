'use client'

import { UserAuthForm } from '@/app/(auth)/auth/components/UserAuthForm'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'
import Logo from '../../../../../public/images/Logo'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '@/app/(auth)/auth/components/LoginForm'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const LoginFormSlice = () => {
  const [sliceLogin, setSliceLoagin] = React.useState<string>(
    'animate-registerSlice',
  )

  const session = useSession()
  const pathName = usePathname()
  const router = useRouter()
  if (session.data && pathName === '/auth') {
    router.push('/')
  }

  return (
    <>
      <div className="grid h-[800px]  w-full grid-flow-col grid-cols-2  grid-rows-1 place-items-center rounded-[8px] border border-[var(--border)]">
        <div className=" relative col-span-1 col-start-1 h-full w-full  place-content-center place-items-center">
          <div className=" flex  justify-center ">
            <div className="absolute flex h-full w-full items-center justify-center">
              <div className="  container relative  hidden h-[800px]  items-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0  ">
                <Button
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    '  absolute  left-6 top-6 ease-in-out md:left-6 md:top-6',
                  )}
                  onClick={() => {
                    setSliceLoagin('animate-sliceRegister')
                  }}
                >
                  Cadastre-se
                </Button>
                <div className="justify-self-center">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${sliceLogin} rounder d-[8px] relative z-10 hidden h-full flex-col   rounded-[8px] border-l border-r border-[var(--border)]  bg-muted bg-slate-400 text-white dark:border-r lg:flex `}
          >
            <div className=" absolute  inset-0  flex flex-col justify-between bg-zinc-900 py-12 ">
              <div className="relative flex items-center  justify-center text-lg font-medium">
                <Link href="/" className="z-10">
                  <Logo width={128} />
                </Link>
              </div>
              <Image
                src={`${
                  sliceLogin === 'animate-sliceLogin'
                    ? '/images/login.jpeg'
                    : '/images/cadastro.webp'
                }`}
                fill
                sizes="100"
                priority={false}
                alt="Authentication"
                className=" block	 rounded-[8px]  object-cover brightness-[60%]"
              />
              <div className="relative   flex  flex-col items-center justify-center">
                <blockquote className="space-y-2 px-4 ">
                  {sliceLogin === 'animate-sliceLogin' ? (
                    <p className=" text-lg ">
                      &ldquo;Emergências não esperam, e nós também não. Estamos
                      ao seu lado a qualquer momento.&rdquo;
                    </p>
                  ) : (
                    <p className=" text-lg ">
                      &ldquo;Em situações críticas, cada segundo conta. Nós
                      estamos dedicados a oferecer atendimento de emergência
                      rápido, eficiente e compassivo. Sua segurança é a nossa
                      prioridade número um.&rdquo;
                    </p>
                  )}
                  <footer className="text-sm italic">Anderson Rony</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className=" relative col-span-1 col-start-2  flex h-full w-full ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Digite seu email abaixo para criar sua conta
              </p>
            </div>

            <Button
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'absolute right-6  top-0 ease-in-out md:right-6',
              )}
              onClick={() => {
                setSliceLoagin('animate-sliceLogin')
              }}
            >
              Entrar
            </Button>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao se cadastrar você concorda com nossos{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Políticas de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginFormSlice

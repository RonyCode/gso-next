'use client'

import React from 'react'
import { UserAuthForm } from '@/app/(auth)/login/components/UserAuthForm'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'
import Logo from '../../../../../public/images/Logo'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '@/app/(auth)/login/components/LoginForm'

const LoginFormSlice = () => {
  const [sliceLogin, setSliceLoagin] = React.useState<string>(
    'animate-registerSlice',
  )
  return (
    <>
      <div className="flex h-screen  w-screen  items-center justify-center">
        <div className="  grid   h-[800px] w-9/12 grid-flow-col  grid-cols-2 grid-rows-1 place-items-center rounded-[8px] border border-[var(--border)] ">
          <div className=" relative  col-span-1 col-start-1 h-full w-full place-content-center place-items-center ">
            <Button
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                '  absolute  left-4 top-8  z-10  ease-in-out md:left-8 md:top-8',
              )}
              onClick={() => {
                setSliceLoagin('animate-sliceRegister')
              }}
            >
              Cadastre-se
            </Button>
            <div className=" flex  justify-center ">
              <div className="absolute">
                <div className="  container relative z-0 hidden h-[800px]  items-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0  ">
                  <LoginForm />
                </div>
              </div>
            </div>
            <div
              className={`${sliceLogin} rounder   d-[8px] relative z-20 hidden h-full flex-col   rounded-[8px] border border-[var(--border)]  bg-muted bg-slate-400 text-white dark:border-r lg:flex `}
            >
              <div className=" absolute  inset-0  flex flex-col justify-between bg-zinc-900 py-12 ">
                <div className="relative z-20 flex items-center  justify-center text-lg font-medium">
                  <Logo width={128} />{' '}
                </div>
                <Image
                  src={`${
                    sliceLogin === 'animate-sliceLogin'
                      ? '/images/login.jpeg'
                      : '/images/cadastro.webp'
                  }`}
                  fill
                  objectFit="cover"
                  alt="Authentication"
                  className="block rounded-[8px] object-cover brightness-[60%]"
                />
                <div className="relative   flex  flex-col items-center justify-center">
                  <blockquote className="space-y-2 px-4 ">
                    {sliceLogin === 'animate-sliceLogin' ? (
                      <p className=" text-lg ">
                        &ldquo;Emergências não esperam, e nós também não.
                        Estamos ao seu lado a qualquer momento.&rdquo;
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

          <div className=" relative col-span-1  col-start-2 flex h-full w-full">
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
                  ' absolute right-4 top-2 ease-in-out md:right-8 md:top-2 ',
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
      </div>
      {/* </div> */}
    </>
  )
}

export default LoginFormSlice

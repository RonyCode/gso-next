'use client'

import { SignUpForm } from '@/app/(auth)/auth/components/SignUpForm'
import { Button, buttonVariants } from '@/ui/button'
import { cn } from '@/lib/utils'
import Logo from '../../../../../public/images/Logo'
import Image from 'next/image'
import Link from 'next/link'
import SigInForm from '@/app/(auth)/auth/components/SigInForm'
import React from 'react'

const LoginFormSlice = () => {
  const [sliceLogin, setSliceLoagin] = React.useState<string>(
    'animate-sliceRegister',
  )

  return (
    <>
      <div className=" grid w-full grid-cols-1 place-items-center rounded-[8px] lg:h-[800px] lg:grid-cols-2 lg:grid-rows-1 lg:border lg:border-[var(--border)]">
        <div
          className={`${
            sliceLogin === 'animate-sliceRegister'
              ? 'hidden h-screen w-full lg:relative lg:col-start-1 lg:col-end-2  lg:block lg:h-full lg:place-content-center lg:place-items-center'
              : 'h-screen w-full  lg:relative lg:col-start-1  lg:col-end-2 lg:h-full lg:place-content-center lg:place-items-center'
          }`}
        >
          <div className=" flex lg:justify-center">
            <div className=" opacity-1 h-full w-full items-center justify-center lg:absolute lg:flex">
              <div className="container relative  grid  h-[800px] items-center  lg:h-full lg:w-full lg:max-w-none lg:grid-cols-1 lg:px-0   ">
                <Button
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    '  fixed left-6  top-20 ease-in-out lg:absolute lg:left-6 lg:top-6',
                  )}
                  onClick={() => {
                    setSliceLoagin('animate-sliceRegister')
                  }}
                >
                  Cadastre-se
                </Button>
                <div className="justify-self-center ">
                  <SigInForm />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${sliceLogin} rounder d-[8px] relative hidden h-full flex-col rounded-[8px] border-l border-r border-[var(--border)] bg-muted  bg-slate-400 text-white lg:z-10 lg:flex dark:border-r `}
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
                priority={true}
                alt="Authentication"
                className=" block rounded-[8px]  object-cover brightness-[60%]"
              />
              <div className="relative flex flex-col items-center justify-center">
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

        <div
          className={`${
            sliceLogin === 'animate-sliceLogin'
              ? 'hidden lg:relative lg:col-start-2 lg:col-end-3  lg:flex lg:h-full lg:w-full'
              : 'absolute  lg:relative lg:col-start-2 lg:col-end-3  lg:flex lg:h-full lg:w-full'
          }`}
        >
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
                'fixed right-6 top-[54px] ease-in-out lg:absolute lg:right-6 lg:top-0',
              )}
              onClick={() => {
                setSliceLoagin('animate-sliceLogin')
              }}
            >
              Entrar
            </Button>
            <SignUpForm />
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

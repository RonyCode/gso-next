'use client'

import * as React from 'react'
import { useTransition } from 'react'

import { signInServerActions } from '@/app/(auth)/login/actions/signInServerAction'
import { useFormLogin } from '@/app/(auth)/login/hooks/useFormLogin'
import { useSignIn } from '@/app/(auth)/login/hooks/useSign'
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/ui/use-toast'
import { LuMail, LuSquareAsterisk } from 'react-icons/lu'
import { SubmitFormAction } from '@/actions/SubmitFormAction'
import { SignUpChema } from '@/schemas/SignUpChema'
import { useFormStatus } from 'react-dom'
import { signIn } from 'next-auth/react'
import { ResultSignIn } from '@/types'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const { signInWithCredentials } = useSignIn()
  const { pending, data, method, action } = useFormStatus()

  const handleSubmitLogin = async (data: FormData | SignInSchema) => {
    const resultData = await signInServerActions(data)
    const result: ResultSignIn = await signInWithCredentials(resultData)
    if (!result.ok) {
      toast({
        variant: 'destructive',
        title: 'Error🤯',
        description: 'Erro ao tentar logar tente novamente! 🤯',
      })
    }
    if (result.ok) {
      toast({
        variant: 'default',
        title: 'Success 🚀',
        description: 'Login realizado com sucesso! 🚀',
      })
    }
  }

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      senha: '',
    },
  })

  return (
    <>
      <div className=" flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu email e senha para acessar sua conta
          </p>
        </div>

        <div className={cn('grid gap-6', className)} {...props}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                await handleSubmitLogin(data)
              })}
              className="w-full space-y-4"
            >
              {' '}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="flex items-center gap-1"
                    >
                      <LuMail /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        placeholder="email@exemplo.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="senha"
                      className="flex items-center gap-1"
                    >
                      <LuSquareAsterisk /> Senha
                    </FormLabel>{' '}
                    <FormControl>
                      <Input
                        {...field}
                        id="senha"
                        placeholder="******"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="senha"
                        autoCorrect="off"
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={pending} className="w-full">
                {pending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>{' '}
            </form>
          </Form>
        </div>
      </div>
      {/* <div className=" w-full  md:w-96  "> */}
      {/*  <form action={handleSubmitLogin}> */}
      {/*    <Input.Root> */}
      {/*      <Input.Load pending={pending} /> */}
      {/*      <Input.Label label="Email" icon={FaUser} htmlFor="email" /> */}
      {/*      <Input.Content */}
      {/*        autoFocus={true} */}
      {/*        {...register('email')} */}
      {/*        label="Email" */}
      {/*        name="email" */}
      {/*        placeholder="Digite seu email" */}
      {/*        hasError={errors.email?.message} */}
      {/*      /> */}
      {/*      <Input.HelpText */}
      {/*        text={errors.email?.message && '📣 ' + errors.email?.message} */}
      {/*      /> */}
      {/*    </Input.Root> */}
      {/*    <Input.Root className="mb-2"> */}
      {/*      <Input.Label label="Senha" icon={FaUnlockKeyhole} htmlFor="senha" /> */}
      {/*      <Input.Content */}
      {/*        {...register('senha')} */}
      {/*        name="senha" */}
      {/*        placeholder="Digite sua senha" */}
      {/*        type="password" */}
      {/*        hasError={errors.senha?.message} */}
      {/*      /> */}
      {/*      <Input.HelpText */}
      {/*        text={errors.senha?.message && '📣 ' + errors.senha?.message} */}
      {/*      /> */}
      {/*    </Input.Root> */}
      {/*    <div className="mt-3 flex items-center justify-between "> */}
      {/*      <ButtonNoTheme */}
      {/*        isLoading={pending} */}
      {/*        disabled={hasError || pending} */}
      {/*        variant="default" */}
      {/*        className="mr-2 w-full max-w-sm p-2" */}
      {/*        type="submit" */}
      {/*      > */}
      {/*        Login */}
      {/*      </ButtonNoTheme> */}
      {/*      <Link */}
      {/*        className="ml-2 inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800" */}
      {/*        href="/recupera-senha" */}
      {/*      > */}
      {/*        Esqueceu sua senha? */}
      {/*      </Link> */}
      {/*    </div> */}
      {/*  </form> */}
      {/*  <h1 className="py-4 text-center text-xl">Entrar com</h1> */}
      {/*  <ButtonNoTheme */}
      {/*    disabled={pending} */}
      {/*    isLoading={pending} */}
      {/*    type="button" */}
      {/*    variant="default" */}
      {/*    className="mx-auto mb-3 w-full  p-2" */}
      {/*    onClick={handleSubmitLoginWithGoogle} */}
      {/*  > */}
      {/*    <svg */}
      {/*      className="mr-2 h-4 w-4" */}
      {/*      aria-hidden="true" */}
      {/*      focusable="false" */}
      {/*      data-prefix="fab" */}
      {/*      data-icon="github" */}
      {/*      role="img" */}
      {/*      xmlns="http://www.w3.org/2000/svg" */}
      {/*      viewBox="0 0 24 24" */}
      {/*    > */}
      {/*      <path */}
      {/*        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" */}
      {/*        fill="#4285F4" */}
      {/*      /> */}
      {/*      <path */}
      {/*        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" */}
      {/*        fill="#34A853" */}
      {/*      /> */}
      {/*      <path */}
      {/*        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" */}
      {/*        fill="#FBBC05" */}
      {/*      /> */}
      {/*      <path */}
      {/*        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" */}
      {/*        fill="#EA4335" */}
      {/*      /> */}
      {/*      <path d="M1 1h22v22H1z" fill="none" /> */}
      {/*    </svg> */}
      {/*    Google */}
      {/*  </ButtonNoTheme> */}
      {/*  <div className="text-center text-xs text-gray-500"> */}
      {/*    &copy;2023 RCode All rights reserved. */}
      {/*  </div> */}
      {/* </div> */}
    </>
  )
}
export default LoginForm

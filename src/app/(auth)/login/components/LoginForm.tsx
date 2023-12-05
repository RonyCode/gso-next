'use client'

import * as React from 'react'

import { signInServerActions } from '@/app/(auth)/login/actions/signInServerAction'
import { useSignIn } from '@/app/(auth)/login/hooks/useSign'
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/ui/use-toast'
import { LuMail, LuSquareAsterisk } from 'react-icons/lu'
import { ResultSignIn } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const [pending, startTransition] = useTransition()
  const { signInWithCredentials } = useSignIn()
  const router = useRouter()

  const handleSubmitLogin = async (data: FormData | SignInSchema) => {
    startTransition(async () => {
      const resultData = await signInServerActions(data)
      const result: ResultSignIn = await signInWithCredentials(resultData)
      if (!result.ok) {
        toast({
          variant: 'danger',
          title: 'Erro ao fazer login tente novamente! 🤯 ',
          description: 'Usuário nao encontrado ou senha Incorreta',
        })
      }
      if (result.ok) {
        toast({
          variant: 'success',
          title: 'Bem vindo de volta! 😍',
          description: 'Login realizado com sucesso',
        })
        router.push('/dashboard')
      }
    })
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
    </>
  )
}
export default LoginForm

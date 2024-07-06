'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FaSpinner } from 'react-icons/fa6'
import { LuMail, LuSquareAsterisk } from 'react-icons/lu'

import { useSignIn } from '@/app/(auth)/auth/hooks/useSign'
import {
  type ISignInSchema,
  SignInSchema,
} from '@/app/(auth)/auth/schemas/SignInSchema'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { GetUserNotification } from '@/functions/GetNotificationUser'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Icons } from '@/ui/icons'
import { Input } from '@/ui/input'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import md5 from 'md5'

type UserAuthFormProps = {
  className?: Element
} & React.HTMLAttributes<HTMLDivElement>

const SigInForm = ({ className, ...props }: UserAuthFormProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const { signInWithGoogle, signInWithCredentials } = useSignIn()
  const router = useRouter()

  const handleSubmitLogin = (data: ISignInSchema): void => {
    startTransition(async () => {
      const result = await signInWithCredentials(data)
      if (!result.ok) {
        toast({
          variant: 'danger',
          title: 'Erro ao fazer login tente novamente! 🤯 ',
          description: 'Usuário nao encontrado ou senha Incorreta',
        })
      }
      if (result.ok) {
        const idMessage = md5(data.email)
        void GetUserNotification('auth', 'user_logged', idMessage)
        toast({
          variant: 'success',
          title: 'Bem vindo de volta! 😍',
          description: 'Login realizado com sucesso',
        })
        router.push(`/`)
      }
    })
  }

  const handleSubmitLoginWithGoogle = async (): Promise<void> => {
    startTransition(async (): Promise<void> => {
      await signInWithGoogle()
    })
  }

  const handleClickLogin = async (): Promise<void> => {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      void navigator.serviceWorker
        .register('/service-worker/index.js')
        .then(async (serviceWorker) => {
          let subscriptionResult =
            await serviceWorker.pushManager.getSubscription()
          if (subscriptionResult == null) {
            subscriptionResult = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            })
          }
          console.log(JSON.stringify(subscriptionResult))
          setCookie('subscription', JSON.stringify(subscriptionResult))
        })
    }
  }

  const form = useForm<ISignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      senha: '',
    },
  })
  let countShow = true

  const detectCapsLock = (
    keyEvent: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (/[A-Z]/.test(keyEvent.currentTarget.value)) {
      if (countShow) {
        countShow = false

        toast({
          variant: 'warning',
          title: 'CAPS LOCK! 📌',
          description: 'Cuidado a tecla CAPS LOCK está ativa',
        })
      }
    }
  }

  return (
    <>
      <LoadingPage pending={pending} />

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
              /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
              onSubmit={form.handleSubmit(async (data): Promise<void> => {
                handleSubmitLogin(data)
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
                      htmlFor="emailsignIn"
                      className="flex items-center gap-1"
                    >
                      <LuMail /> Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="emailsignIn"
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
                        onInput={detectCapsLock}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                onClick={handleClickLogin}
                disabled={pending}
                className="w-full"
                type="submit"
              >
                {pending && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>{' '}
              <Link
                href="/recuperar-senha"
                className="underline underline-offset-4 hover:text-primary"
              >
                <p className="p-2  text-sm text-muted-foreground hover:text-primary">
                  Esqueceu sua senha?
                </p>
              </Link>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2  text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>
          <Button
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onClick={handleSubmitLoginWithGoogle}
            variant="outline"
            disabled={pending}
          >
            {pending ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
            )}{' '}
            Google
          </Button>
        </div>
      </div>
    </>
  )
}
export default SigInForm

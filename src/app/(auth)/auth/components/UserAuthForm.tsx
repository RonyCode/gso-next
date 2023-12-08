'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/ui/icons'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/ui/use-toast'
import { useTransition } from 'react'
import { useSignIn } from '@/app/(auth)/auth/hooks/useSign'
import { preRegisterUserServerActions } from '@/app/(auth)/precadastro-usuario/actions/preRegisterUserServerAction'
import { redirect } from 'next/navigation'
import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema'
import { usePreRegister } from '@/app/(auth)/precadastro-usuario/hooks/usePreRegister/usePreRegister'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [pending, startTransition] = useTransition()
  const { signInWithGoogle } = useSignIn()
  const { preRegisterUser } = usePreRegister()

  const form = useForm<PreRegisterUserSchema>({
    resolver: zodResolver(PreRegisterUserSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const handleSubmitLoginWithGoogle = async () => {
    startTransition(async () => {
      await signInWithGoogle()
    })
  }

  const handleSubmitPreCadastro = async (
    data: FormData | PreRegisterUserSchema,
  ) => {
    startTransition(async () => {
      const result = await preRegisterUserServerActions(data)
      if (result?.email !== 'failed') {
        const emailSended = await preRegisterUser(result)
        if (emailSended?.data) {
          if (emailSended.code !== 400) {
            toast({
              title: 'Email enviado com sucesso! 😍',
              description: emailSended.message,
              variant: 'success',
            })
            redirect('/')
          }
        }
        if (!emailSended?.data) {
          toast({
            title: 'Error ao enviar email',
            description: emailSended?.message,
            variant: 'danger',
          })
        }
      }
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await handleSubmitPreCadastro(data)
            })}
            className="w-full space-y-4"
          >
            {' '}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
            <Button type="submit" disabled={pending} className="w-full">
              {pending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Se increver com email
            </Button>{' '}
          </form>
        </Form>
      </div>
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
  )
}

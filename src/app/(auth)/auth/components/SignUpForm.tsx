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
import { preRegisterUserServerActions } from '@/app/(auth)/auth/actions/preRegisterUserServerAction'
import { redirect } from 'next/navigation'
import { PreRegisterUserSchema } from '@/app/(auth)/auth/schemas/PreRegisterUserSchema'
import { usePreRegister } from '@/app/(auth)/auth/hooks/usePreRegister/usePreRegister'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [pending, startTransition] = useTransition()
  const { preRegisterUser } = usePreRegister()

  const form = useForm<PreRegisterUserSchema>({
    resolver: zodResolver(PreRegisterUserSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

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
    <div className={cn('grid gap-y-4 px-9 lg:px-0', className)} {...props}>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              await handleSubmitPreCadastro(data)
            })}
            className="w-full "
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
            <Button type="submit" disabled={pending} className="mt-4 w-full">
              {pending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Se increver com email
            </Button>{' '}
          </form>
        </Form>
      </div>
    </div>
  )
}

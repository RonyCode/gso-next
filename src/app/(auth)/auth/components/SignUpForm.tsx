'use client'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { preRegisterUserServerActions } from '@/app/(auth)/auth/actions/preRegisterUserServerAction'
import { usePreRegister } from '@/app/(auth)/auth/hooks/usePreRegister/usePreRegister'
import {
  type IPreRegisterUserSchema,
  PreRegisterUserSchema,
} from '@/app/(auth)/auth/schemas/IPreRegisterUserSchema'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Icons } from '@/ui/icons'
import { Input } from '@/ui/input'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
type UserAuthFormProps = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function SignUpForm({
  className,
  ...props
}: UserAuthFormProps): JSX.Element {
  const [pending, startTransition] = useTransition()
  const { preRegisterUser } = usePreRegister()

  const form = useForm<IPreRegisterUserSchema>({
    resolver: zodResolver(PreRegisterUserSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const handleSubmitPreCadastro = (data: IPreRegisterUserSchema): void => {
    startTransition(async () => {
      const result = await preRegisterUserServerActions(data)
      if (result?.email !== 'failed') {
        const emailSended = await preRegisterUser(result)
        if (emailSended?.data === true) {
          if (emailSended?.code !== 400) {
            toast({
              title: 'Email enviado com sucesso! 😍',
              description: emailSended.message,
              variant: 'success',
            })
            redirect('/')
          }
        }
        if (emailSended?.data === false) {
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
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onSubmit={form.handleSubmit(async (data) => {
              handleSubmitPreCadastro(data)
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

'use client'

import * as React from 'react'
import { useTransition } from 'react'
import { FaEnvelope } from 'react-icons/fa6'

import { redirect } from 'next/navigation'

import { preRegisterUserServerActions } from '@/app/(auth)/precadastro-usuario/actions/preRegisterUserServerAction'
import { useFormPreRegister } from '@/app/(auth)/precadastro-usuario/hooks/useFormPreRegister'
import { Input } from '@/components/Form/Input'
import { MessageRabbit } from '@/functions/MessageRabbit'
import ButtonNoTheme from '@/ui/ButtonNoTheme'
import { usePreRegister } from '@/app/(auth)/precadastro-usuario/hooks/usePreRegister/usePreRegister'

const PreRegisterUserForm = () => {
  const { errors, register } = useFormPreRegister()
  const [pending, startTransition] = useTransition()
  const { preRegisterUser } = usePreRegister()

  const handleSubmitPreCadastro = async (data: FormData) => {
    startTransition(async () => {
      const result = await preRegisterUserServerActions(data)
      await preRegisterUser(result)
      if (result) {
        await MessageRabbit(result?.data?.email, 'email-sended')
        redirect('/')
      }
    })
  }

  const hasError =
    errors.email?.message?.length && errors.email?.message?.length > 0

  return (
    <>
      <form
        action={handleSubmitPreCadastro}
        className="flex w-full items-center justify-center gap-12 p-2 md:p-8"
      >
        <div className=" w-full md:w-8/12">
          <Input.Root>
            <Input.Label label="Email" icon={FaEnvelope} htmlFor="email" />
            <Input.Content
              {...register('email')}
              label="Email"
              name="email"
              placeholder="Digite seu email"
              hasError={errors.email?.message}
            />
            <Input.HelpText
              text={errors.email?.message && '📣 ' + errors.email?.message}
            />
          </Input.Root>
          <ButtonNoTheme
            className="float-right"
            isLoading={pending}
            disabled={hasError || pending}
            variant="default"
            size="default"
            type="submit"
          >
            Enviar
          </ButtonNoTheme>
        </div>
      </form>
    </>
  )
}
export default PreRegisterUserForm

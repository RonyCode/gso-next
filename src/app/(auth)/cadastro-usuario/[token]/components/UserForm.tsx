'use client'

import * as React from 'react'
import { useTransition } from 'react'
import {
  FaCakeCandles,
  FaCity,
  FaEnvelope,
  FaHashtag,
  FaHouse,
  FaHouseUser,
  FaIdCard,
  FaMapLocationDot,
  FaMountainCity,
  FaPhone,
  FaTreeCity,
  FaUnlockKeyhole,
} from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { useFormRegister } from '@/app/(auth)/cadastro-usuario/[token]/hooks/useFormRegister'
import { Input } from '@/components/Form/Input'
import { useCep } from '@/hooks/useCep'
import { CepProps } from '@/types'
import ButtonNoTheme from '@/ui/ButtonNoTheme'
import debounce from 'lodash.debounce'

import { submitUserForm } from '../actions/userActions'

enum Fields {
  nome = 'nome',
  email = 'email',
  cpf = 'cpf',
  data_nascimento = 'data_nascimento',
  telefone = 'telefone',
  cep = 'cep',
  endereco = 'endereco',
  numero = 'numero',
  bairro = 'bairro',
  cidade = 'cidade',
  estado = 'estado',
  senha = 'senha',
  confirmaSenha = 'confirmaSenha',
}

export const UserForm = () => {
  const {
    errors,
    register,
    isValid,
    setValue,
    setError,
    dirtyFields,
    clearErrors,
  } = useFormRegister()
  const { findCep } = useCep()

  const [pending, startTransition] = useTransition()

  const handleSubmit = async (data: FormData) => {
    startTransition(async () => {
      const restult = await submitUserForm(data)
      if (restult?.errors) {
        const arrayErrors = Object.entries(restult.errors)
        for (const error of arrayErrors) {
          chageValueInputError(error[0] as Fields, error[1])
        }
      }
    })
  }

  const chageValueInput = (field: Fields, newValue: string) => {
    setValue(field, newValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    clearErrors(field)
  }
  const chageValueInputError = (field: Fields, newValueError: string) => {
    setError(field, { message: newValueError })
  }

  const handleCep = debounce(async (e) => {
    if (e?.target?.value) {
      startTransition(async () => {
        const { street, city, district, stateShortname }: CepProps =
          await findCep(e?.target?.value)
        if (!city) {
          toast.error('cep não encontrado')
        }
        chageValueInput(Fields.endereco, street)
        chageValueInput(Fields.cidade, city)
        chageValueInput(Fields.bairro, district)
        chageValueInput(Fields.estado, stateShortname)
      })
    }
  }, 800)

  const hasErro = !isValid || Object.keys(dirtyFields).length == 0
  return (
    <form action={handleSubmit} className="min-w-full">
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        {}

        <Input.Load pending={pending} />
        <Input.Root>
          <Input.Label label="Nome" icon={FaHouse} htmlFor="nome" />
          <Input.Content
            {...register('nome')}
            id="nome"
            name="nome"
            placeholder="Digite seu nome"
            hasError={errors.nome?.message}
          />
          <Input.HelpText
            text={errors.nome?.message && '📣 ' + errors.nome?.message}
          />
        </Input.Root>
      </div>
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        <Input.Root>
          <Input.Label label="Email" icon={FaEnvelope} htmlFor="email" />
          <Input.Content
            {...register('email')}
            name="email"
            id="email"
            placeholder="Digite seu email"
            hasError={errors.email?.message}
          />
          <Input.HelpText
            text={errors.email?.message && '📣 ' + errors.email?.message}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label htmlFor="cpf" label="Cpf" icon={FaIdCard} />
          <Input.ContentMasked
            {...register('cpf')}
            name="cpf"
            id="cpf"
            mask="___.___.___-__"
            placeholder="999.999.999-99"
            hasError={errors.cpf?.message}
          />
          <Input.HelpText
            text={errors.cpf?.message && '📣 ' + errors.cpf?.message}
          />
        </Input.Root>
      </div>
      <div className="my-2 flex flex-col gap-2 sm:flex-row ">
        <Input.Root>
          <Input.Label
            label="Nascimento"
            icon={FaCakeCandles}
            htmlFor="data_nascimento"
          />
          <Input.ContentMasked
            {...register('data_nascimento')}
            mask="__/__/____"
            name="data_nascimento"
            id="data_nascimento"
            placeholder="99/99/9999"
            hasError={errors.data_nascimento?.message}
          />
          <Input.HelpText
            text={
              errors.data_nascimento?.message &&
              '📣 ' + errors.data_nascimento?.message
            }
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Telefone" icon={FaPhone} htmlFor="telefone" />
          <Input.ContentMasked
            {...register('telefone')}
            id="telefone"
            name="telefone"
            mask="(__) _____-____"
            placeholder="(99) 99999-9999"
            hasError={errors.telefone?.message}
          />
          <Input.HelpText
            text={errors.telefone?.message && '📣 ' + errors.telefone?.message}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cep" icon={FaMapLocationDot} htmlFor="cep" />
          <Input.ContentMasked
            {...register('cep')}
            onChange={handleCep}
            name="cep"
            id="cep"
            mask="_____-___"
            placeholder="99999-999"
            hasError={errors.cep?.message}
          />
          <Input.HelpText
            text={errors.cep?.message && '📣 ' + errors.cep?.message}
          />
        </Input.Root>
      </div>
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        <Input.Root>
          <Input.Label label="Endereço" icon={FaHouseUser} htmlFor="endereco" />
          <Input.Content
            {...register('endereco')}
            name="endereco"
            id="endereco"
            placeholder="Digite seu endereco"
            hasError={errors.endereco?.message}
          />
          <Input.HelpText
            text={errors.endereco?.message && '📣 ' + errors.endereco?.message}
          />
        </Input.Root>

        <Input.Root className="w-full md:w-6/12">
          <Input.Label label="Numero" icon={FaHashtag} htmlFor="numero" />
          <Input.Content
            {...register('numero')}
            name="numero"
            id="numero"
            placeholder="Numero residência"
            hasError={errors.numero?.message}
          />
          <Input.HelpText
            text={errors.numero?.message && '📣 ' + errors.numero?.message}
          />
        </Input.Root>
      </div>
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        <Input.Root>
          <Input.Label label="Bairro" icon={FaTreeCity} htmlFor="bairro" />
          <Input.Content
            {...register('bairro')}
            name="bairro"
            id="bairro"
            placeholder="Digite seu bairro"
            hasError={errors.bairro?.message}
          />
          <Input.HelpText
            text={errors.bairro?.message && '📣 ' + errors.bairro?.message}
          />
        </Input.Root>
        <Input.Root>
          <Input.Label label="Cidade" icon={FaCity} htmlFor="cidade" />
          <Input.Content
            {...register('cidade')}
            name="cidade"
            id="cidade"
            placeholder="Digite sua cidade"
            hasError={errors.cidade?.message}
          />
          <Input.HelpText
            text={errors.cidade?.message && '📣 ' + errors.cidade?.message}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label label="Estado" icon={FaMountainCity} htmlFor="estado" />
          <Input.Content
            {...register('estado')}
            name="estado"
            id="estado"
            placeholder="Digite seu estado"
            hasError={errors.estado?.message}
          />
          <Input.HelpText
            text={errors?.estado?.message && '📣 ' + errors.estado?.message}
          />
        </Input.Root>
      </div>
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        <Input.Root>
          <Input.Label label="Senha" icon={FaUnlockKeyhole} htmlFor="senha" />
          <Input.Content
            {...register('senha')}
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            type="password"
            hasError={errors.senha?.message}
          />
          <Input.HelpText
            text={errors.senha?.message && '📣 ' + errors.senha?.message}
          />
        </Input.Root>

        <Input.Root>
          <Input.Label
            label="Confirma Senha"
            icon={FaUnlockKeyhole}
            htmlFor="confirmaSenha"
          />
          <Input.Content
            {...register('confirmaSenha')}
            type="password"
            name="confirmaSenha"
            id="confirmaSenha"
            placeholder="Repita sua senha"
            hasError={errors.confirmaSenha?.message}
          />
          <Input.HelpText
            text={
              errors.confirmaSenha?.message &&
              '📣 ' + errors.confirmaSenha?.message
            }
          />
        </Input.Root>
      </div>
      <div className=" float-right mt-3 flex w-1/2 items-center justify-end ">
        <ButtonNoTheme
          isLoading={pending}
          disabled={pending}
          variant="default"
          size="default"
          type="submit"
        >
          Cancelar
        </ButtonNoTheme>
        <ButtonNoTheme
          isLoading={pending}
          disabled={hasErro || pending}
          variant="default"
          size="default"
          type="submit"
        >
          Cadastrar
        </ButtonNoTheme>
      </div>
    </form>
  )
}

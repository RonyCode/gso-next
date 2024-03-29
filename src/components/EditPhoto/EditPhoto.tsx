'use client'
import React, { useTransition } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { cn } from '@/lib/utils'
import { LuCamera } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signedUpAction } from '@/app/(auth)/cadastro-usuario/[token]/actions/signedUpAction'
import { toast } from '@/ui/use-toast'
import { redirect } from 'next/navigation'
import LoadingPage from '@/components/Loadings/LoadingPage'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Progress } from '@/ui/progress'
import { UpdatePhotoAction } from '@/app/(private)/profile/actions/UpdatePhotoAction'
import { EdiPhotoSchema } from '@/app/(private)/profile/schemas/EditPhotoSchema'

type EditPhotoProps = {
  className?: string
} & React.ComponentProps<typeof Dialog>

export const EditPhoto = ({ className, ...props }: EditPhotoProps) => {
  const [pending, startTransition] = useTransition()

  const form = useForm<EdiPhotoSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EdiPhotoSchema),
    defaultValues: {
      file: null,
    },
  })

  const fileRef = form.register('file')

  // 2. Define a submit handler.
  const handleSubmit = (values: EdiPhotoSchema) => {
    startTransition(async () => {
      const restult = await UpdatePhotoAction(values)
      console.log(restult)
      // if (!restult?.name) {
      //   toast({
      //     variant: 'danger',
      //     title: 'Algo deu errado! 🤯 ',
      //     description:
      //       'Foto de usuário não atualizada, verifique tamanho ou extensão de arquivo enviado',
      //   })
      // }
      // if (restult?.name) {
      //   toast({
      //     variant: 'success',
      //     title: 'Ok! Foto atualizada! 🤯 ',
      //     description: 'Tudo certo foto de usuário atualizado',
      //   })
      //   redirect('/profile')
      // }
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <LuCamera className="h-9 w-9 rounded-full border-2 border-foreground/50 bg-accent/50 p-1 text-foreground/50 backdrop-blur  hover:border-foreground hover:text-foreground " />
        </DialogTrigger>
        <DialogContent
          className={cn(' w-full sm:max-w-[425px]', className)}
          {...props}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              Selecione uma foto que não seja maior que 2MB{' '}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <LoadingPage pending={pending} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (data) => {
                  handleSubmit(data)
                })}
                className="w-full p-10"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>Arquivo</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder="shadcn"
                            {...fileRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button type="submit" className="mt-4">
                  Salvar
                </Button>
              </form>
            </Form>
          </div>
          {/* <DialogFooter> */}
          {/*  <Button type="submit">Salvar</Button> */}
          {/* </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  )
}

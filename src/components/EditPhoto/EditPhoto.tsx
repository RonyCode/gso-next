'use client'
import React, { useState, useTransition } from 'react'
import {
  Dialog,
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
import { toast } from '@/ui/use-toast'
import LoadingPage from '@/components/Loadings/LoadingPage'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { FileSchema } from '@/schemas/FileSchema'
import Image from 'next/image'
import { Progress } from '@/ui/progress'
import axios, { AxiosProgressEvent } from 'axios'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/stores/user/userStore'

type EditPhotoProps = {
  className?: string
} & React.ComponentProps<typeof Dialog>

export const EditPhoto = ({ className, ...props }: EditPhotoProps) => {
  const [pending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [nameFile, setNameFile] = useState<string | null>(null)
  const [percent, setPercent] = useState<number | null>(0)
  const { data: session, update } = useSession()

  const form = useForm<FileSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(FileSchema),
    defaultValues: {
      file: null,
    },
  })

  const fileRef = form.register('file')

  // 2. Define a submit handler.
  const handleSubmit = (data: FileSchema) => {
    startTransition(async () => {
      const token = session?.token

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
        { file: data.file },
        {
          onUploadProgress,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response?.status !== 202) {
        toast({
          variant: 'danger',
          title: 'Algo deu errado! 🤯 ',
          description:
            'Foto de usuário não atualizada, verifique tamanho ou extensão de arquivo enviado',
        })
      }
      if (response?.status === 202) {
        setNameFile(response.data.data)
        useUserStore.getState().actions.add({
          account: {
            image: JSON.stringify(
              process.env.NEXT_PUBLIC_API_GSO +
                '/public/storage/image/' +
                response.data.data,
            ),
          },
        })
        await update({
          user: {
            image: JSON.stringify(
              process.env.NEXT_PUBLIC_API_GSO +
                '/public/storage/image/' +
                response.data.data,
            ),
          },
        })
        toast({
          variant: 'success',
          title: 'Ok! Foto atualizada! 🤯 ',
          description: 'Tudo certo foto de usuário atualizado',
        })
        // redirect('/profile')
      }
    })
  }

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    const { loaded, total } = progressEvent
    const percent = Math.floor((loaded * 100) / total!)
    setPercent(percent)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFile(file)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <LuCamera className="h-9 w-9 rounded-full border-2 border-foreground/50 bg-accent/50 p-1 text-foreground/50 backdrop-blur  hover:border-foreground hover:text-foreground " />
        </DialogTrigger>
        <DialogContent className={cn(' w-screen', className)} {...props}>
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
                            onChange={handleChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                {previewUrl && file && (
                  <div className="  my-4 w-full scale-100 transform rounded-2xl duration-300  hover:right-1/2 hover:scale-150  hover:cursor-zoom-in ">
                    {file.type.startsWith('image/') ? (
                      <Image
                        src={previewUrl}
                        width={0}
                        height={0}
                        alt="Selecione um arquivo"
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }} // optional
                      />
                    ) : null}
                    <Progress value={percent} />
                  </div>
                )}
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

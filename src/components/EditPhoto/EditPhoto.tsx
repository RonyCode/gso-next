'use client'
import { type User } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LuCamera, LuCheckCircle } from 'react-icons/lu'

import LoadingPage from '@/components/Loadings/LoadingPage'
import { cn } from '@/lib/utils'
import { FileSchema, type IFileSchema } from '@/schemas/FileSchema'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form'
import { Input } from '@/ui/input'
import { toast } from '@/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { type AxiosProgressEvent } from 'axios'

type EditPhotoProps = {
  className?: string
} & React.ComponentProps<typeof Dialog>

export const EditPhoto = ({
  className,
  ...props
}: EditPhotoProps): JSX.Element => {
  const [pending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const [percent, setPercent] = useState<number | null>(0)
  const { data: session, update } = useSession()
  const [user, setUser] = useState<User>({
    access_token: '',
    date_creation_token: 0,
    date_expires_token: 0,
    email: '',
    expires_at: 0,
    id: '',
    id_message: '',
    image: '',
    name: '',
    nome: '',
    picture: '',
    refresh_token: '',
    senha: '',
    token: '',
  })
  const router = useRouter()

  const form = useForm<IFileSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(FileSchema),
    defaultValues: {
      file_image: null,
      file_pdf: null,
    },
  })

  const fileRef = form.register('file_image')

  // 2. Define a submit handler.
  const handleSubmit = (data: IFileSchema): void => {
    startTransition(async () => {
      const token = session?.token

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
        { file: data.file_image },
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
        await update({
          ...user,
          image:
            process.env.NEXT_PUBLIC_API_GSO +
            '/public/storage/image/' +
            response.data.data,
        })
        setOpen(false)
        handleResetValues()
        router.refresh()
        toast({
          variant: 'success',
          title: 'Ok! Foto atualizada! 🤯 ',
          description: 'Tudo certo foto de usuário atualizado',
        })
      }
    })
  }

  const onUploadProgress = (progressEvent: AxiosProgressEvent): void => {
    const { loaded, total } = progressEvent
    if (total == null) return
    const percent = Math.floor((loaded * 100) / total)
    setPercent(percent)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null
    setFile(file)

    if (previewUrl != null) {
      URL.revokeObjectURL(previewUrl)
    }
    if (file != null) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }
  const handleResetValues = (): void => {
    setFile(null)
    setPercent(0)
    setPreviewUrl(null)
    form.resetField('file_image')
  }

  useEffect(() => {
    if (session != null) {
      setUser(session.user as User)
    }
  }, [session])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <LuCamera className="h-9 w-9 rounded-full border-2 border-foreground/50 bg-accent/50 p-1 text-foreground/50 backdrop-blur  hover:border-foreground hover:text-foreground " />
          </div>
        </DialogTrigger>
        <DialogContent className={cn(' w-screen', className)} {...props}>
          <DialogHeader>
            <DialogTitle>Alterar imagem</DialogTitle>
            <DialogDescription>
              Selecione uma foto que não seja maior que 2MB{' '}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 ">
            <LoadingPage pending={pending} />
            <Form {...form}>
              <form
                /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                onSubmit={form.handleSubmit(async (data) => {
                  handleSubmit(data)
                })}
                className="w-full"
              >
                <FormField
                  control={form.control}
                  name="file_image"
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
                            disabled={percent === 100}
                            accept={'image/*'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                {previewUrl != null && file != null && (
                  <div className="  mt-3 w-full rounded-2xl ">
                    {file.type.startsWith('image/') ? (
                      <Image
                        src={previewUrl}
                        width={0}
                        height={0}
                        alt="Selecione um arquivo"
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '60vh',
                          objectFit: 'contain',
                        }} // optional
                      />
                    ) : null}

                    <div className="mt-3 w-full rounded-full bg-background">
                      <div
                        className=" rounded-full bg-secondary   p-0.5 text-center text-xs font-medium leading-none text-foreground"
                        style={{ width: percent + '%' }}
                      >
                        {percent != null && percent <= 100 && `${percent}%`}
                        <span className="absolute bottom-[100px] right-5 stroke-2  text-green-500">
                          {percent === 100 && <LuCheckCircle size={30} />}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {percent === 100 ? (
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={handleResetValues}
                      className="float-end mt-4"
                      disabled={pending || file == null}
                      variant="default"
                    >
                      Fechar
                    </Button>
                  </DialogClose>
                ) : (
                  <Button
                    type="submit"
                    variant="default"
                    className="float-end mt-4"
                    disabled={pending || file == null}
                  >
                    Enviar Arquivo
                  </Button>
                )}{' '}
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

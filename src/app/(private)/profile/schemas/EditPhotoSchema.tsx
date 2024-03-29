import { z } from 'zod'

const MAX_SIZE_MB = 2

export const EdiPhotoSchema = z.object({
  file: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine(
      (file) => !file || (!!file && file.size <= MAX_SIZE_MB * 1024 * 1024),
      {
        message: `O arquivo de imagem tem que ter no máximo ${MAX_SIZE_MB}MB.`,
      },
    )
    .refine((file) => !file || (!!file && file.type?.startsWith('image/')), {
      message:
        'Tipo de arquivo não permitido. Somente extensões (.png, .jpg, .jpeg, .svg)',
    })
    .nullable(),
})
export type EdiPhotoSchema = z.infer<typeof EdiPhotoSchema>

import { z } from 'zod'

const MAX_SIZE_MB = 2

export const FileSchema = z.object({
  file_image: z
    .custom<FileList>()
    .transform((file) => file?.length > 0 && file.item(0))
    .refine(
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      (file) => !file || (!!file && file?.size <= MAX_SIZE_MB * 1024 * 1024),
      {
        message: `O arquivo de imagem tem que ter no máximo ${MAX_SIZE_MB}MB.`,
      },
    )
    .refine(
      (file) =>
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        !file ||
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        (!!file && file.type === 'image/png') ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/svg+xml',

      {
        message:
          'Tipo de arquivo não permitido. Somente extensões (.png, .jpg, .jpeg, .svg)',
      },
    )
    .nullable(),

  file_pdf: z
    .custom<FileList>()
    .transform((file) => file?.length > 0 && file.item(0))
    .refine(
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      (file) => !file || (!!file && file?.size <= MAX_SIZE_MB * 1024 * 1024),
      {
        message: `O arquivo de imagem tem que ter no máximo ${MAX_SIZE_MB}MB.`,
      },
    )
    .refine(
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      (file) => !file || (!!file && file?.type === 'application/pdf'),

      {
        message:
          'Tipo de arquivo não permitido. Somente extensões (.png, .jpg, .jpeg, .svg)',
      },
    )
    .nullable(),
})
export type IFileSchema = z.infer<typeof FileSchema>

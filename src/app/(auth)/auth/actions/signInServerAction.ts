'use server'

export const signInServerActions = async (): Promise<void> => {
  // try {
  //   revalidatePath('/')
  //   if (payload instanceof FormData) {
  //     const formData = Object.fromEntries(payload.entries())
  //
  //     const result = SignInSchema.safeParse(formData)
  //     if (result.success) {
  //       return result.data as SignInSchema
  //     }
  //     if (!result.success) {
  //       console.log(result.error.message)
  //       return JSON.parse(JSON.stringify(result.error as ZodError))
  //     }
  //   }
  //
  //   return payload
  // } catch (error) {
  //   return JSON.parse(JSON.stringify(error as ZodError))
  // }
}

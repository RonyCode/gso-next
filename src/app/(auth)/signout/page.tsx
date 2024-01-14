'use client'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/ui/alert-dialog'

const SignOut = () => {
  const router = useRouter()

  const handleClick = async () => {
    deleteCookies()
    await signOut({
      redirect: false,
    })
    router.push('/auth')
  }
  return (
    <>
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sua última sessão expirou!</AlertDialogTitle>
            <AlertDialogDescription>
              Para continuar, faça login novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClick}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default SignOut

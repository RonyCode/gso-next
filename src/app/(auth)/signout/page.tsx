import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/ui/alert-dialog'
import SignOutButtonDefault from '@/components/Buttoms/SignOutButton/SignOutButtonDefault'

const SignOut = () => {
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
            <SignOutButtonDefault />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default SignOut

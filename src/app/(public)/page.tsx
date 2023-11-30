import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <button type="button" className="bg-indigo-500" disabled>
        <svg className="... mr-3 h-5 w-5" viewBox="0 0 24 24"></svg>
        Loading...
      </button>
      <div className="min-w-max">
        <h1>Server Session</h1>
        <pre>{'nome; ' + session?.nome}</pre>
        <pre>{'email: ' + session?.email}</pre>
        <pre>{'image: ' + session?.image}</pre>
        <pre>{'cod_usuario: ' + session?.cod_usuario}</pre>
      </div>
    </main>
  )
}

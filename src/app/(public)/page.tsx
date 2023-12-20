import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'
import BannerHome1 from '@/components/Layout/banner/BannerHome1'
import BannerHome2 from '@/components/Layout/banner/BannerHome2'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <main className="  h-full w-full bg-gradient-to-t from-background to-secondary">
        <header className="h-full min-h-screen w-full">
          <BannerHome1 />
        </header>

        <BannerHome2 />

        <section className="relative  min-h-screen bg-secondary ">
          <h1>Server Session</h1>
          <pre>{'nome; ' + session?.nome}</pre>
          <pre>{'email: ' + session?.email}</pre>
          <pre>{'image: ' + session?.image}</pre>
          <pre>{'cod_usuario: ' + session?.cod_usuario}</pre>
        </section>
      </main>
    </>
  )
}

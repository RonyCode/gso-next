import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'
import BannerHome1 from '@/components/Layout/banner/BannerHome1'
import BannerHome2 from '@/components/Layout/banner/BannerHome2'
import { CardsBanner } from '@/components/Cards/CardsBanner'
import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'

export default async function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <main className="  h-full  bg-gradient-to-t from-background to-secondary ">
          <header className="h-full min-h-screen  ">
            <BannerHome1 />
          </header>
          <BannerHome2 />
          <section className=" relative  min-h-screen bg-gradient-to-t from-background to-secondary ">
            <section className=" relative grid  min-h-screen w-full grid-cols-1  place-items-center md:grid-cols-2 ">
              <CardsBanner />
              <CardsBanner />
              <CardsBanner />
              <CardsBanner />
            </section>
          </section>
        </main>
      </MaxWidthWrapper>
    </>
  )
}

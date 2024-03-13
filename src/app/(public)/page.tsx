import 'react-toastify/dist/ReactToastify.css'

import BannerHome1 from '@/components/Layout/banner/BannerHome1'
import BannerHome2 from '@/components/Layout/banner/BannerHome2'
import { CardsBanner } from '@/components/Cards/CardsBanner'
import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'GSO | Home',
  description: 'Authentication forms built using the components.',
}

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

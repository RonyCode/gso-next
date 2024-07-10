import 'react-toastify/dist/ReactToastify.css'

import { type Metadata } from 'next'
import React from 'react'

import { CardsBanner } from '@/components/Cards/CardsBanner'
import BannerHome1 from '@/components/Headers/banner/BannerHome1'
import BannerHome2 from '@/components/Headers/banner/BannerHome2'
import MaxWidthWrapper from '@/components/Pages/MaxWidthWrapper'
import IconCar from '@/icons/IconCar'

export const metadata: Metadata = {
  title: 'GSO | Home',
  description: 'Authentication forms built using the components.',
}

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <MaxWidthWrapper>
        <main className="bg-gradient-to-t from-background to-secondary ">
          <header className="z-0 h-full  min-h-screen ">
            <BannerHome1 />
          </header>
          <BannerHome2 />
          <section className=" relative  min-h-screen bg-gradient-to-t from-background to-secondary ">
            <section className=" relative grid  min-h-screen w-full grid-cols-1  place-items-center md:grid-cols-2 ">
              <IconCar
                width={500}
                className="ml-1 fill-foreground/60 stroke-foreground/60"
              />
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

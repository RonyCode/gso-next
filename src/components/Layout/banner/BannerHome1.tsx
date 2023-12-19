import React from 'react'
import { CardsBanner } from '@/components/Cards/CardsBanner'
import Logo from '../../../../public/images/Logo'

const BannerHome1 = () => {
  return (
    <header className="h-full w-full text-foreground brightness-75 ">
      <div
        className=" flex h-screen w-full items-end justify-center bg-no-repeat text-foreground   md:grid md:grid-cols-2 "
        style={{
          backgroundImage: 'url(/images/banner.jpg)',
        }}
      >
        <div className=" flex-col place-items-center md:col-start-2 md:mb-[150px] md:grid">
          <Logo width={172} />
          <div className="mt-6  text-start">
            <p className="text-sm font-bold uppercase">Serviços</p>
            <p className="text-3xl font-bold">Gestão de Serviços e Operações</p>
            <p className="mb-10 text-2xl leading-none">
              Poderosa ferramenta de gerenciamento
            </p>

            <a
              href="/contact"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
            >
              Saiba mais...
            </a>
          </div>
        </div>
      </div>
      <div className="grid h-screen grid-cols-2 grid-rows-[300px_minmax(700px,_1fr)_100px] place-items-center gap-2 bg-foreground text-center  text-background">
        <div className="col-start-1 col-end-4 flex h-full w-full  place-content-center items-center  justify-center text-3xl">
          <span className="bg-primary  p-4 text-5xl font-bold text-foreground/80">
            Projeto GSO
          </span>
          Desenvolvido por quem conhece as demandas
        </div>{' '}
        <p className="h-full w-full border border-amber-800 leading-none">
          Projeto RCode Desenvolvido por quem conhece
        </p>{' '}
        <p className="h-full w-full border border-amber-800 text-3xl">
          Projeto RCode Desenvolvido por quem conhece
        </p>{' '}
        {/* <CardsBanner /> */}
      </div>
    </header>
  )
}

export default BannerHome1

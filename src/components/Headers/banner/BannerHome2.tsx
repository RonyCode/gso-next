import React, { type ReactElement } from 'react'
import { LuArrowRightToLine } from 'react-icons/lu'

const BannerMain = (): ReactElement => {
  return (
    <header className="h-screen w-full">
      <div
        className="h-full w-full   bg-bottom bg-no-repeat text-foreground brightness-75 md:bg-cover "
        style={{
          backgroundImage: 'url(/images/cidade.png)',
        }}
      >
        <div
          className=" b grid h-full  w-full grid-cols-1  place-items-end bg-cover  bg-center bg-no-repeat pb-12 text-foreground  md:grid-cols-2 md:place-items-end   md:bg-contain md:p-0 "
          style={{
            backgroundImage: 'url(/images/banner1.png)',
          }}
        >
          <div className="text-center tracking-tighter md:border-r-8 md:border-primary md:p-8 md:text-start md:shadow-2xl md:shadow-black  md:backdrop-blur-sm ">
            <div>
              <p className="text-4xl  font-bold uppercase">Integração</p>
              <p className="text-2xl font-bold">
                Integração de Sistemas e Colaboração Interinstitucional:
              </p>
              <p className="mb-5 text-lg leading-none">
                Digitalização facilita a integração de sistemas e a colaboração
                entre diferentes órgãos de segurança, melhorando a comunicação e
                a eficácia na resposta a emergências.
              </p>

              <a
                href="/contact"
                className="inline-flex  items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
              >
                <span className="mr-1">saiba mais </span>
                <LuArrowRightToLine />
              </a>
            </div>
          </div>
          <div className=" hidden	text-start tracking-tighter md:block md:place-content-end md:border-r-8 md:border-primary md:p-8 md:shadow-2xl md:shadow-black  md:backdrop-blur-sm">
            <div>
              <p className="text-4xl font-bold uppercase">Monitoramento</p>
              <p className="text-2xl font-bold">Monitoramento em Tempo Real:</p>
              <p className="mb-4 text-lg leading-none">
                Utilização de tecnologias para coletar, processar e analisar
                dados em tempo real, permitindo às agências de segurança
                monitorar eventos e responder rapidamente a incidentes.
              </p>

              <a
                href="/contact"
                className="inline-flex  items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
              >
                <span className="mr-1">saiba mais </span>
                <LuArrowRightToLine />{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BannerMain

import React from 'react'
import Logo from '../../../../public/images/Logo'

const BannerHome1 = () => {
  return (
    <header className="h-full w-full  ">
      <div
        className=" fixed flex h-screen w-full  place-items-center bg-no-repeat  brightness-75  md:grid md:grid-cols-2 md:justify-center"
        style={{
          backgroundImage: 'url(/images/banner.jpg)',
        }}
      >
        <div
          className="  flex max-w-prose flex-col
          place-items-center items-center justify-center
          gap-y-3 rounded-3xl p-6 tracking-tight text-[#f2f2f2]
          antialiased shadow-2xl brightness-125 backdrop-blur-[2px]
          md:col-start-2  md:grid"
        >
          <Logo width={156} />
          <h1 className="text-center text-5xl  font-bold  md:text-4xl">
            <p className=" ">Gestão de Serviços e Operações</p>
          </h1>
          <p className=" max-w-prose text-center text-lg  leading-none ">
            Ocorrências Sob Controle, Soluções em um Toque: Nosso App de
            Gerenciamento, Transformando Desafios em{' '}
            <span className="text-4xl font-bold text-primary">Resultados!</span>
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
      {/* <div className="grid h-full grid-cols-2 grid-rows-[300px_minmax(700px,_1fr)_100px] place-items-center gap-2 bg-foreground text-center  text-background"> */}
      {/*  <div className="col-start-1 col-end-4 flex h-full w-full  place-content-center items-center  justify-center text-3xl"> */}
      {/*    <span className="bg-primary  p-4 text-5xl font-bold text-foreground/80"> */}
      {/*      Projeto GSO */}
      {/*    </span> */}
      {/*    Desenvolvido por quem conhece as demandas */}
      {/*  </div>{' '} */}
      {/*  <p className="h-full w-full border border-amber-800 leading-none"> */}
      {/*    Projeto RCode Desenvolvido por quem conhece */}
      {/*  </p>{' '} */}
      {/*  <p className="h-full w-full border border-amber-800 text-3xl"> */}
      {/*    Projeto RCode Desenvolvido por quem conhece */}
      {/*  </p>{' '} */}
      {/*  /!* <CardsBanner /> *!/ */}
      {/* </div> */}
    </header>
  )
}

export default BannerHome1

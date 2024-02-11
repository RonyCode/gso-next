'use client'
import React, { useEffect, useState } from 'react'
import Logo from '../../../../public/images/Logo'
import Link from 'next/link'

const BannerHome1 = () => {
  const [showNavBar, setShowNavBar] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        setShowNavBar(true)
      } else {
        setShowNavBar(false)
      }
    })
  }, [showNavBar])

  return (
    <div className=" h-full  w-screen ">
      <div
        className=" fixed  grid h-full  w-[calc(100%-22px)] bg-no-repeat brightness-75 md:w-[calc(100%-146px)] md:grid-cols-2
        md:place-items-center md:bg-cover"
        style={{
          backgroundImage: 'url(/images/banner.jpg)',
        }}
      >
        <div
          className={
            showNavBar
              ? 'min-w-screen fixed h-screen min-h-screen w-screen brightness-[30%]  backdrop-blur-sm ' +
                'transition duration-200 ease-in-out'
              : 'min-w-screen fixed h-screen  min-h-screen  w-screen transition duration-200 ease-in-out'
          }
        ></div>
        <div
          className="flex
          flex-col place-content-center items-center justify-center gap-y-3 rounded-md p-4
          tracking-tight text-[#f2f2f2]  antialiased md:col-start-2 md:grid md:max-w-xl
          md:place-items-center md:shadow-2xl"
        >
          <span className=" md:block">
            <Logo width={156} />
          </span>
          <h1 className="text-center text-5xl  font-bold  md:text-4xl">
            <p className=" ">Gestão de Serviços e Operações</p>
          </h1>
          <p className=" max-w-prose text-center text-lg  leading-none ">
            Ocorrências Sob Controle, Soluções em um Toque: Nosso App de
            Gerenciamento, Transformando Desafios em{' '}
            <span className="text-4xl font-bold text-primary">Resultados!</span>
          </p>
          <Link
            href="/contact"
            className="z-50 inline-flex h-10 items-center justify-center whitespace-nowrap
              rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
              ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:pointer-events-none disabled:opacity-50
            "
          >
            Saiba mais...
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BannerHome1

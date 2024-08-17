'use client'
import React, { type ReactElement, useEffect, useState } from 'react'

import Logo from '../../../../public/images/Logo'

const BannerHome1 = (): ReactElement => {
  const [showNavBar, setShowNavBar] = useState(false)
  const [disapear, setDisapear] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        setShowNavBar(true)
      } else {
        setShowNavBar(false)
      }

      if (window.scrollY > 2000) {
        setDisapear(true)
      } else {
        setDisapear(false)
      }
    })
  }, [showNavBar])

  return (
    <div>
      <div
        className={`${disapear}  fixed grid h-full  w-full bg-no-repeat brightness-75 md:w-[80vw] md:grid-cols-2
        md:place-items-center md:bg-cover`}
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
        </div>
      </div>
    </div>
  )
}

export default BannerHome1

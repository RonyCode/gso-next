'use client'
import './page-not-foun.css'
import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import ButtonNoTheme from '@/ui/ButtonNoTheme'

const PageNotFound = ({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="main">
      <div className="bg-purple">
        <div className="stars">
          <div className="custom-navbar">
            <div className="brand-logo">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  width="150"
                  height="0"
                  alt="brand-logo"
                />
              </Link>
            </div>
            <div className="navbar-links">
              <ul>
                <li></li>
              </ul>
            </div>
          </div>
          <div className=" flex h-screen flex-col items-center justify-evenly">
            <Image
              className="image-404"
              src="http://salehriaz.com/404Page/img/404.svg"
              width="300"
              height="0"
              alt="image-404"
            />
            <ButtonNoTheme
              variant="default"
              size="default"
              onClick={() => reset()}
            >
              Tentar novamente
            </ButtonNoTheme>
          </div>
          <div className="objects">
            <Image
              className="object_rocket"
              src="http://salehriaz.com/404Page/img/rocket.svg"
              width="40"
              height="0"
              alt="object_rocket"
            />
            <div className="earth-moon">
              <Image
                className="object_earth"
                src="http://salehriaz.com/404Page/img/earth.svg"
                width="100"
                height="0"
                alt="object_earth"
              />
              <Image
                className="object_moon"
                src="http://salehriaz.com/404Page/img/moon.svg"
                width="80"
                height="0"
                alt="object_moon"
              />
            </div>
            <div className="box_astronaut">
              <Image
                className="object_astronaut"
                src="http://salehriaz.com/404Page/img/astronaut.svg"
                width="140"
                height="0"
                alt="object_astronaut"
              />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PageNotFound

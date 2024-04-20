'use client'
import imgPm from '../../../public/images/pm.jpeg'
import imgBm from '../../../public/images/bm.jpeg'
import imgFemPm from '../../../public/images/femPm.jpeg'
import imgFemBm from '../../../public/images/femBm.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/images/Logo'

function NavbarCommon() {
  return (
    <div className="flex h-full w-full items-center justify-center border-b-[1px]">
      <div className="round-[8px] top-0 mb-[17px]  flex h-32 w-full items-center  justify-around border border-r-0  align-middle shadow-2xl  ">
        <div className=" top-0 z-50 mb-10  flex-row self-end justify-self-start "></div>
        <div className="z-50 flex   w-full justify-center xl:relative ">
          <Link className="z-50 w-48 justify-self-center" href="/">
            <Logo />
          </Link>
        </div>
        <div className="m-0 flex h-32 justify-end rounded-lg brightness-[0.8]">
          {/* {user.email} */}

          <Image
            src={imgPm}
            alt="test"
            placeholder="blur"
            className="
          animate-wiggle
          delay-[2000]
          mr-2
          h-32
          w-24
          skew-x-[20deg]
          rounded-lg
          object-cover
          object-top
          [--position-initial:15px]
          [--slide-distance:0]
          xl:w-44
            "
          />
          <Image
            src={imgFemPm}
            alt="test"
            placeholder="blur"
            className="
          animate-wiggle
          mr-2
          h-32
          w-24
          skew-x-[20deg]
          rounded-lg
          object-cover
          object-right-top
          [--position-initial:15px]
          [--slide-distance:-250px]
          xl:w-44
          "
          />

          <Image
            src={imgBm}
            alt="test"
            placeholder="blur"
            className="
          animate-wiggle
          mr-2
          h-32
          w-24
          skew-x-[20deg]
          object-cover
          object-bottom
          [--position-initial:15px]
          [--slide-distance:-500px]
          xl:w-44
          "
          />
          <Image
            src={imgFemBm}
            alt="test"
            placeholder="blur"
            className="
          animate-wiggle
          mr-2
          h-32
          w-24
          skew-x-[20deg]
          rounded-lg
          object-cover
          object-left-top
          [--position-initial:15px]
          [--slide-distance:-750px]
          xl:w-44"
          />
        </div>
      </div>
    </div>
  )
}

export default NavbarCommon

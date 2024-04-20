'use client';
import imgPm from '../../../../public/assets/img/pm.jpeg';
import imgBm from '../../../../public/assets/img/bm.jpg';
import imgFemPm from '../../../../public/assets/img/femPm.jpeg';
import imgFemBm from '../../../../public/assets/img/femBm.jpeg';
import Image from 'next/image';
import Breadcrump from '../breadcrump/Breadcrump';
import Link from 'next/link';
import Logo from '../../../../public/assets/icons/Logo';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/ContextApp';

function NavbarCommon() {
  const { user } = useContext(AppContext);
  return (
    <div className="flex h-full w-full items-center justify-center border-b-[1px]">
      <div className="top-0 mb-[17px] flex  h-48 w-full items-center   justify-around bg-[#212525]  align-middle shadow-2xl ">
        <div className=" top-0 z-50 mb-10  flex-row self-end justify-self-start ">
          <Breadcrump></Breadcrump>
        </div>
        <div className="z-50 flex   w-full justify-center xl:relative">
          <Link className="z-50 w-48 justify-self-center" href="/">
            <div>
              <Logo />
            </div>
          </Link>
        </div>
        <div className="m-0 flex h-48 justify-end rounded-lg brightness-[0.8]">
          {user.email}

          <Image
            src={imgPm}
            alt="test"
            placeholder="blur"
            className="
          mr-2
          h-48
          w-24
          skew-x-[20deg]
          animate-wiggle
          rounded-lg
          object-cover
          object-top
          delay-[2000]
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
          mr-2
          h-48
          w-24
          skew-x-[20deg]
          animate-wiggle
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
          mr-2
          h-48
          w-24
          skew-x-[20deg]
          animate-wiggle
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
          mr-2
          h-48
          w-24
          skew-x-[20deg]
          animate-wiggle
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
  );
}

export default NavbarCommon;

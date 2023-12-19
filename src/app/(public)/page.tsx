import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'
import BannerHome1 from '@/components/Layout/banner/BannerHome1'
import BannerHome2 from '@/components/Layout/banner/BannerHome2'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <main className="  h-full w-full bg-gradient-to-t from-background to-secondary">
        <header className="h-full min-h-screen w-full">
          <BannerHome1 />

          {/* <div className="flex h-full w-full  items-end justify-evenly bg-orange-700   text-foreground"> */}
          {/* <svg */}
          {/*  width="100%" */}
          {/*  height="50%" */}
          {/*  id="svg" */}
          {/*  viewBox="0 0 1440 360" */}
          {/*  xmlns="http://www.w3.org/2000/svg" */}
          {/*  className="absolute transition delay-150 duration-300 ease-in-out" */}
          {/* > */}
          {/*  <defs> */}
          {/*    <linearGradient */}
          {/*      id="gradient" */}
          {/*      x1="50%" */}
          {/*      y1="0%" */}
          {/*      x2="50%" */}
          {/*      y2="100%" */}
          {/*    > */}
          {/*      <stop offset="5%" stopColor="#e11d48"></stop> */}
          {/*      <stop offset="95%" stopColor="#333333"></stop> */}
          {/*    </linearGradient> */}
          {/*  </defs> */}
          {/*  <path */}
          {/*    d="M 0,700 L 0,105 C 70.13333333333335,128.94102564102565 140.2666666666667,152.88205128205126 210,146 C 279.7333333333333,139.11794871794874 349.0666666666666,101.41282051282052 445,82 C 540.9333333333334,62.58717948717948 663.4666666666668,61.466666666666676 747,57 C 830.5333333333332,52.533333333333324 875.0666666666664,44.72051282051281 951,67 C 1026.9333333333336,89.27948717948719 1134.2666666666669,141.65128205128204 1221,153 C 1307.7333333333331,164.34871794871796 1373.8666666666666,134.674358974359 1440,105 L 1440,700 L 0,700 Z" */}
          {/*    stroke="none" */}
          {/*    strokeWidth="0" */}
          {/*    fill="url(#gradient)" */}
          {/*    fillOpacity="0.265" */}
          {/*    className="path-0  transition-all delay-150 duration-300 ease-in-out" */}
          {/*  ></path> */}
          {/*  <defs> */}
          {/*    <linearGradient */}
          {/*      id="gradient" */}
          {/*      x1="50%" */}
          {/*      y1="0%" */}
          {/*      x2="50%" */}
          {/*      y2="100%" */}
          {/*    > */}
          {/*      <stop offset="5%" stopColor="#e11d48"></stop> */}
          {/*      <stop offset="95%" stopColor="#333333"></stop> */}
          {/*    </linearGradient> */}
          {/*  </defs> */}
          {/*  <path */}
          {/*    d="M 0,700 L 0,245 C 71.4897435897436,223.62564102564102 142.9794871794872,202.25128205128206 214,199 C 285.0205128205128,195.74871794871794 355.57179487179485,210.6205128205128 444,231 C 532.4282051282051,251.3794871794872 638.7333333333333,277.26666666666665 735,294 C 831.2666666666667,310.73333333333335 917.4948717948716,318.3128205128205 996,294 C 1074.5051282051284,269.6871794871795 1145.2871794871796,213.4820512820513 1218,200 C 1290.7128205128204,186.5179487179487 1365.35641025641,215.75897435897434 1440,245 L 1440,700 L 0,700 Z" */}
          {/*    stroke="none" */}
          {/*    strokeWidth="0" */}
          {/*    fill="url(#gradient)" */}
          {/*    fillOpacity="0.4" */}
          {/*    className="path-1 transition-all delay-150 duration-300 ease-in-out" */}
          {/*  ></path> */}
          {/*  <defs> */}
          {/*    <linearGradient */}
          {/*      id="gradient" */}
          {/*      x1="50%" */}
          {/*      y1="0%" */}
          {/*      x2="50%" */}
          {/*      y2="100%" */}
          {/*    > */}
          {/*      <stop offset="5%" stopColor="#e11d48"></stop> */}
          {/*      <stop offset="95%" stopColor="#333333"></stop> */}
          {/*    </linearGradient> */}
          {/*  </defs> */}
          {/*  <path */}
          {/*    d="M 0,700 L 0,385 C 61.535897435897425,374.7230769230769 123.07179487179485,364.44615384615383 198,380 C 272.92820512820515,395.55384615384617 361.24871794871797,436.93846153846147 466,428 C 570.751282051282,419.06153846153853 691.9333333333334,359.80000000000007 762,345 C 832.0666666666666,330.19999999999993 851.0179487179486,359.8615384615385 916,375 C 980.9820512820514,390.1384615384615 1091.9948717948716,390.7538461538461 1187,390 C 1282.0051282051284,389.2461538461539 1361.002564102564,387.12307692307695 1440,385 L 1440,700 L 0,700 Z" */}
          {/*    stroke="none" */}
          {/*    strokeWidth="0" */}
          {/*    fill="url(#gradient)" */}
          {/*    fillOpacity="0.53" */}
          {/*    className="path-2 transition-all delay-150 duration-300 ease-in-out" */}
          {/*  ></path> */}
          {/*  <defs> */}
          {/*    <linearGradient */}
          {/*      id="gradient" */}
          {/*      x1="50%" */}
          {/*      y1="0%" */}
          {/*      x2="50%" */}
          {/*      y2="100%" */}
          {/*    > */}
          {/*      <stop offset="5%" stopColor="#e11d48"></stop> */}
          {/*      <stop offset="95%" stopColor="#333333"></stop> */}
          {/*    </linearGradient> */}
          {/*  </defs> */}
          {/*  <path */}
          {/*    d="M 0,700 L 0,525 C 88.84615384615384,509.4307692307692 177.69230769230768,493.8615384615385 246,488 C 314.3076923076923,482.1384615384615 362.0769230769231,485.9846153846154 454,487 C 545.9230769230769,488.0153846153846 681.9999999999999,486.2 763,492 C 844.0000000000001,497.8 869.9230769230769,511.21538461538466 945,524 C 1020.0769230769231,536.7846153846153 1144.3076923076924,548.9384615384615 1235,549 C 1325.6923076923076,549.0615384615385 1382.8461538461538,537.0307692307692 1440,525 L 1440,700 L 0,700 Z" */}
          {/*    stroke="none" */}
          {/*    strokeWidth="0" */}
          {/*    fill="url(#gradient)" */}
          {/*    fillOpacity="1" */}
          {/*    className="path-3 transition-all delay-150 duration-300 ease-in-out" */}
          {/*  ></path> */}
          {/* </svg> */}
          {/* </div> */}
          <div
            className="h-[120vh] min-h-screen w-full rotate-180 bg-secondary  bg-cover bg-center bg-no-repeat text-foreground brightness-75"
            style={{
              backgroundImage: 'url(/images/fog1.png)',
            }}
          >
            <BannerHome2 />
          </div>
        </header>

        <section className="relative  min-h-screen ">
          <h1>Server Session</h1>
          <pre>{'nome; ' + session?.nome}</pre>
          <pre>{'email: ' + session?.email}</pre>
          <pre>{'image: ' + session?.image}</pre>
          <pre>{'cod_usuario: ' + session?.cod_usuario}</pre>
        </section>
      </main>
    </>
  )
}

import Link from 'next/link'

import { LuMenu, LuSearch } from 'react-icons/lu'
import { useState } from 'react'
import Logo from '../../../public/images/Logo'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [state, setState] = useState(false)

  const menus = [
    { title: 'Home', path: '/your-path' },
    { title: 'Blog', path: '/your-path' },
    { title: 'About Us', path: '/your-path' },
    { title: 'Contact Us', path: '/your-path' },
  ]
  return (
    <nav className="w-full border-b bg-white md:border-0">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <h1 className="text-3xl font-bold text-purple-600">
              <Logo width={100} />
            </h1>
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
              onClick={() => setState(!state)}
            >
              <LuMenu />
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

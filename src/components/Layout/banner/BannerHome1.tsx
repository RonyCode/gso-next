import React from 'react'

const BannerHome1 = () => {
  return (
    <header className="fixed h-full w-screen">
      <div
        className=" flex h-[750px] w-full items-center  bg-contain bg-no-repeat text-foreground brightness-75"
        style={{
          backgroundImage: 'url(/images/banner.jpg)',
        }}
      >
        <div className="flex flex-col items-end  text-start md:w-11/12 ">
          <div>
            <p className="text-sm font-bold uppercase">Services</p>
            <p className="text-3xl font-bold">Multimedia products</p>
            <p className="mb-10 text-2xl leading-none">
              Attractive designs for your brand
            </p>

            <a
              href="/contact"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BannerHome1

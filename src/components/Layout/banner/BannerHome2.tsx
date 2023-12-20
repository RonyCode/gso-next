import React from 'react'

const BannerMain = () => {
  return (
    <header className="min-w-screen h-screen">
      <div
        className="  min-h-screen w-full  bg-cover bg-center bg-no-repeat text-foreground brightness-75 backdrop-blur-sm"
        style={{
          backgroundImage: 'url(/images/cidade.png)',
        }}
      >
        <div
          className="grid h-screen w-full grid-cols-2 items-end  bg-contain bg-center bg-no-repeat pt-48 text-foreground"
          style={{
            backgroundImage: 'url(/images/banner1.png)',
          }}
        >
          <div className="border-r-8 border-primary p-12 text-start shadow-2xl shadow-black backdrop-blur-sm">
            <div>
              <p className="text-sm font-bold uppercase">Services</p>
              <p className="text-3xl font-bold">Multimedia products</p>
              <p className="mb-5 text-2xl leading-none">
                Attractive designs for your brand
              </p>

              <a
                href="/contact"
                className="inline-flex  items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
              >
                Contato
              </a>
            </div>
          </div>
          <div className=" flex place-content-end justify-end border-r-8 border-primary p-12 text-end shadow-2xl shadow-black backdrop-blur-sm">
            <div>
              <p className="text-sm font-bold uppercase">Services</p>
              <p className="text-3xl font-bold">Multimedia products</p>
              <p className="mb-5 text-2xl leading-none">
                Attractive designs for your brand
              </p>

              <a
                href="/contact"
                className="inline-flex  items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            "
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default BannerMain

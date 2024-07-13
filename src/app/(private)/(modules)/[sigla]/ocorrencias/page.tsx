import { type ReactNode } from 'react'
import { LuSiren } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

const Ocorrencias = (): ReactNode => {
  return (
    <>
      <CardDefault
        title="Ocorrências"
        description="Ocorrencias do site GSO"
        image={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/ocorrencias.jpg'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/ocorrencias.jpg'
        }
        className="w-screen"
        icon={<LuSiren size={28} />}
      >
        <h1>hello</h1>
      </CardDefault>
    </>
  )
}
export default Ocorrencias

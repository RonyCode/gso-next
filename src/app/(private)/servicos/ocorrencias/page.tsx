import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideSiren } from 'lucide-react'

const Ocorrencias = () => {
  return (
    <>
      <CardDefault
        title="Ocorrências"
        description="Ocorrencias do site GSO"
        image="/images/ocorrencias.png"
        imageMobile="/images/ocorrencias.png"
        className="w-screen"
        icon={<LucideSiren size={28} />}
      >
        <h1>hello</h1>
      </CardDefault>
    </>
  )
}
export default Ocorrencias

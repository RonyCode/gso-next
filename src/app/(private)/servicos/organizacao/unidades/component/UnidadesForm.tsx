import { Unidade } from '../../../../../../../types/index'

export const UnidadesForm = ({ unidades }: { unidades: Unidade }) => {
  return (
    <>
      {unidades.image} - {unidades.name}
    </>
  )
}
export default UnidadesForm

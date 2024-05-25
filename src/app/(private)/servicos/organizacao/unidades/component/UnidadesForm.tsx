import { type Unidade } from '../../../../../../../types/index'

export const UnidadesForm = ({
  unidades,
}: {
  unidades: Unidade
}): JSX.Element => {
  return (
    <>
      {unidades.image} - {unidades.name}
    </>
  )
}
export default UnidadesForm

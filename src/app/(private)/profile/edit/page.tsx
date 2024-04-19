import { CardDefault } from '@/components/Cards/CardDefault'
import { LuArrowBigRight } from 'react-icons/lu'

const EditProfile = async () => {
  return (
    <>
      <CardDefault
        title="TR"
        description="asdasdasd"
        icon={<LuArrowBigRight />}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur,
          voluptate.
        </p>
      </CardDefault>
    </>
  )
}
export default EditProfile

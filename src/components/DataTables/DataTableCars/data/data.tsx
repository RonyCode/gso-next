import {
  LuActivitySquare,
  LuCheck,
  LuCheckCircle,
  LuCircleOff,
  LuFlag,
  LuGem,
  LuHeartPulse,
  LuHome,
  LuHotel,
  LuLandmark,
  LuSkull,
  LuStar,
  LuWrench,
} from 'react-icons/lu'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const typeFuel = [
  {
    value: 'Gasolina',
    label: 'Gasolina',
  },
  {
    value: 'Alcool',
    label: 'Alcool',
  },
  {
    value: 'Diesel',
    label: 'Diesel',
  },
]

export const statusVehicle = [
  {
    value: 1,
    label: 'Operante',
    icon: LuCheck,
  },
  {
    value: 2,
    label: 'Inoperante',
    icon: LuSkull,
  },
]

export const condition = [
  {
    label: 'NOVO',
    value: 1,
    icon: LuGem,
  },
  {
    label: 'USADO',
    value: 2,
    icon: LuHeartPulse,
  },

  {
    label: 'MANUTENÇÃO',
    value: 3,
    icon: LuActivitySquare,
  },

  {
    label: 'AVARIADO',
    value: 4,
    icon: LuWrench,
  },
]

export const unities = [
  {
    label: '1º CIA',
    value: '1',
    icon: LuHotel,
  },

  {
    label: '2º CIA',
    value: '2',
    icon: LuHotel,
  },
  {
    label: '3º CIA',
    value: '3',
    icon: LuHotel,
  },
  {
    label: '4º CIA',
    value: '4',
    icon: LuHotel,
  },
  {
    label: '5º CIA',
    value: '5',
    icon: LuHotel,
  },
  {
    label: '6º CIA',
    value: '6',
    icon: LuHotel,
  },
  {
    label: '7º CIA',
    value: '7',
    icon: LuHotel,
  },
  {
    label: '8º CIA',
    value: '8',
    icon: LuHotel,
  },
  {
    label: '9º CIA',
    value: '9',
    icon: LuHotel,
  },
  {
    label: '10º CIA',
    value: '10',
    icon: LuHotel,
  },
]

import { LuHotel, LuStar, LuThumbsUp } from 'react-icons/lu'

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 1,
    label: 'ALFA',
  },
  {
    value: 2,
    label: 'BRAVO',
  },
  {
    value: 3,
    label: 'CHARLIE',
  },
  {
    value: 4,
    label: 'DELTA',
  },
  {
    value: 5,
    label: 'EXTRA',
  },
]

export const statuses = [
  {
    value: 1,
    label: 'Publicado',
    icon: StopwatchIcon,
  },
  {
    value: 2,
    label: 'Aguardando',
    icon: CheckCircledIcon,
  },
  {
    value: 3,
    label: 'Cancelado',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
]

export const types = [
  {
    label: 'Extra',
    value: 2,
    icon: LuStar,
  },
  {
    label: 'Normal',
    value: 1,
    icon: LuThumbsUp,
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

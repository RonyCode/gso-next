import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'
import {
  LucideHome,
  LucideHotel,
  LucideLandmark,
  LucideLandPlot,
} from 'lucide-react'

export const labels = [
  {
    value: 'Alfa',
    label: 'Alfa',
  },
  {
    value: '07:00',
    label: '07:00',
  },
  {
    value: '19:00',
    label: '19:00',
  },
  {
    value: 'Bravo',
    label: 'Bravo',
  },
  {
    value: 'Charlie',
    label: 'Charlie',
  },
  {
    value: 'Delta',
    label: 'Delta',
  },

  {
    value: 'Extra',
    label: 'Extra',
  },
]

export const statuses = [
  {
    value: 'aguardando',
    label: 'Aguardando',
    icon: StopwatchIcon,
  },
  {
    value: 'publicado',
    label: 'Publicado',
    icon: CheckCircledIcon,
  },
  {
    value: 'cancelado',
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
    label: 'UNIDADE',
    value: '1',
    icon: LucideHome,
  },
  {
    label: 'BATALHÃO',
    value: '2',
    icon: LucideHotel,
  },

  {
    label: 'COMANDO',
    value: '3',
    icon: LucideLandmark,
  },

  {
    label: 'INDEPENDENTE',
    value: '4',
    icon: LucideLandPlot,
  },
]

export const unities = [
  {
    label: '1º CIA',
    value: '1',
    icon: LucideHotel,
  },

  {
    label: '2º CIA',
    value: '2',
    icon: LucideHotel,
  },
  {
    label: '3º CIA',
    value: '3',
    icon: LucideHotel,
  },
  {
    label: '4º CIA',
    value: '4',
    icon: LucideHotel,
  },
  {
    label: '5º CIA',
    value: '5',
    icon: LucideHotel,
  },
  {
    label: '6º CIA',
    value: '6',
    icon: LucideHotel,
  },
  {
    label: '7º CIA',
    value: '7',
    icon: LucideHotel,
  },
  {
    label: '8º CIA',
    value: '8',
    icon: LucideHotel,
  },
  {
    label: '9º CIA',
    value: '9',
    icon: LucideHotel,
  },
  {
    label: '10º CIA',
    value: '10',
    icon: LucideHotel,
  },
]

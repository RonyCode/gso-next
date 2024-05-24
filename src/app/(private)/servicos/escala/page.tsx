import React from 'react'
import { CardDefault } from '@/components/Cards/CardDefault'
import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { LucideCalendarDays } from 'lucide-react'
import { CarsUnity, EventProps, Member } from '../../../../../types/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.'
}





const Escala = () => {
  const event: EventProps[] = [
    {
      id: 3,
      day: 21,
      month: 3,
      year: 2024,
      unity: '1',
      title: 'teste 1',
      description: 'teste description 1',
      group: 'Alfa',
      imgUnity: '/images/imgUnity.jpeg',
      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      type: 'normal',
      status: 'publicado',
      company: 'Palmas',
      date: '21/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 3,
      month: 3,
      year: 2024,
      unity: '2',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'normal',
      group: 'Bravo',
      imgUnity: '/images/imgUnity.jpeg',
      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'CB ANDERSON',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'SGT B.MORAES',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'CB ATHUS',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'CB JHONATAN',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '03/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 3,
      month: 3,
      year: 2024,
      unity: '10',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'normal',
      group: 'Bravo',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '03/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 3,
      month: 3,
      year: 2024,
      unity: '3',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'normal',
      group: 'Delta',
      imgUnity: '/images/imgUnity.jpeg',
      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '03/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 18,
      month: 3,
      year: 2024,
      unity: '4',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'normal',
      group: 'Charlie',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '18/03/2024',
      start: '07:00',
      end: '19:00'
    },

    {
      id: 3,
      day: 18,
      month: 3,
      year: 2024,
      unity: '5',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'normal',
      group: 'Bravo',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '18/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 29,
      month: 3,
      year: 2024,
      unity: '6',
      title: 'teste 1',
      description: 'teste description 1',
      type: 'normal',
      group: 'Alfa',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '29/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 13,
      month: 3,
      year: 2024,
      unity: '7',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'normal',
      group: 'Alfa',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '13/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 7,
      month: 3,
      year: 2024,
      unity: '8',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'normal',
      group: 'Delta',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '07/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 23,
      month: 3,
      year: 2024,
      unity: '9',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'normal',
      group: 'Bravo',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '23/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 1,
      month: 3,
      year: 2024,
      unity: '1',
      title: 'teste 31',
      description: 'teste description 3',
      type: 'normal',
      group: 'Charlie',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '01/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 15,
      month: 3,
      year: 2024,
      unity: '3',
      title: 'teste 1',
      description: 'teste description 1',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '15/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 1,
      month: 3,
      year: 2024,
      unity: '5',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '01/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 14,
      month: 3,
      year: 2024,
      unity: '9',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'aguardando',
      company: 'Palmas',
      date: '14/03/2024',
      start: '19:00',
      end: '07:00'
    },
    {
      id: 3,
      day: 14,
      month: 3,
      year: 2024,
      unity: '7',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'cancelado',
      company: 'Palmas',
      date: '14/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 22,
      month: 3,
      year: 2024,
      unity: '7',
      title: 'teste 1',
      description: 'teste description 1',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'aguardando',
      company: 'Palmas',
      date: '22/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 26,
      month: 3,
      year: 2024,
      unity: '3',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'extra',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABT-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'UR-4321',
            imageCar: '/images/img-vtr2.jpg',
            members:
              ([
                {
                  name: 'user 15',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          },
          {
            nameCar: 'ESC-1544',
            imageCar: '/images/img-vtr3.webp',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      status: 'cancelado',
      company: 'Palmas',
      date: '26/03/2024',
      start: '07:00',
      end: '19:00'
    },
    {
      id: 3,
      day: 18,
      month: 3,
      year: 2024,
      unity: '2',
      title: 'teste 3',
      description: 'teste description 3',
      group: 'Extra',
      imgUnity: '/images/imgUnity.jpeg',

      cars:
        ([
          {
            nameCar: 'ABC-1234',
            imageCar: '/images/img-vtr1.jpg',
            members:
              ([
                {
                  name: 'user 1',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg'
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg'
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp'
                }
              ] as Member[]) || null
          }
        ] as CarsUnity[]) || null,
      type: 'extra',
      status: 'aguardando',
      company: 'Palmas',
      date: '18/03/2024',
      start: '19:00',
      end: '07:00'
    }
  ]

  return (
    <>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image="https://apexpublicschool.com/assets/images/calender.jpg"
        imageMobile="https://apexpublicschool.com/assets/images/calender.jpg"
        icon={<LucideCalendarDays size={28} />}
      >
        <CalendarGso event={event} />
      </CardDefault>
    </>
  )
}
export default Escala

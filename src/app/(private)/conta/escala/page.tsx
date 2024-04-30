import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CarsUnity, EventProps, Member } from '../../../../../types/index'

const MinhaEscala = () => {
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
          },
        ] as CarsUnity[]) || null,
      type: 'normal',
      status: 'publicado',
      company: 'Palmas',
      date: '21/03/2024',
      start: '07:00',
      end: '19:00',
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'SGT B.MORAES',
                  email: 'user1@mail',
                  function: 'motorista',
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'CB ATHUS',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'CB JHONATAN',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
          },
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '03/03/2024',
      start: '19:00',
      end: '07:00',
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 21',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 33',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
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
                  imageMember: '/images/user1.jpg',
                },

                {
                  name: 'user 2',
                  email: 'user2@mail',
                  function: 'componente',
                  imageMember: '/images/user2.jpg',
                },
                {
                  name: 'user 3',
                  email: 'user3@mail',
                  function: 'componente',
                  imageMember: '/images/user3.webp',
                },
              ] as Member[]) || null,
          },
        ] as CarsUnity[]) || null,
      status: 'publicado',
      company: 'Palmas',
      date: '03/03/2024',
      start: '19:00',
      end: '07:00',
    },
  ]
  return (
    <>
      <div className="p-6">
        <CalendarGso event={event} />{' '}
      </div>
    </>
  )
}
export default MinhaEscala

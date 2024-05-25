'use client'

export default function Docs(): JSX.Element {
  // const sendNotifications = () => {
  //   if (
  //     'Notification' in window &&
  //     window.Notification.permission === 'granted'
  //   ) {
  //     // eslint-disable-next-line no-new
  //     new Notification('GSO', {
  //       body: 'Teste push notification',
  //       icon: 'images/logo_x72.png',
  //       badge: 'images/logo_x72.png',
  //     })
  //   }
  // }
  // const requestNotificationPermission = useCallback(() => {
  //   if ('Notification' in window) {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === 'granted') {
  //         sendNotifications()
  //       }
  //     })
  //   }
  // }, [])
  //
  // useEffect(() => {
  //   if ('Notification' in window) {
  //     requestNotificationPermission()
  //   }
  // }, [requestNotificationPermission])

  return (
    <main>
      <button>Click notificacao</button>
    </main>
  )
}

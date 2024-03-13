'use client'
import { useCallback, useEffect } from 'react'

export default function Docs() {
  const sendNotifications = () => {
    if (
      'Notification' in window &&
      window.Notification.permission === 'granted'
    ) {
      // eslint-disable-next-line no-new
      new Notification('GSO', {
        body: 'asdasd',
        icon: 'images/logo_x72.png',
      })
    }
  }
  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          sendNotifications()
        }
      })
    }
  }, [])

  useEffect(() => {
    if ('Notification' in window) {
      requestNotificationPermission()
    }
  }, [requestNotificationPermission])

  return (
    <>
      <main>
        <button onClick={sendNotifications}>Click notificacao</button>
      </main>
    </>
  )
}

const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed')
  })
}
installEvent()

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated')
  })
}
activateEvent()

const cacheName = 'v2'

const cacheClone = async (e) => {
  const res = await fetch(e.request)
  const resClone = res.clone()

  const cache = await caches.open(cacheName)
  await cache.put(e.request, resClone)
  return res
}

const fetchEvent = () => {
  self.addEventListener('fetch', (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res),
    )
  })
}

fetchEvent()

self.addEventListener('push', function (event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  const pushData = event.data.json()
  const options = {
    body: pushData.body,
    icon: '/images/logo_x72.png',
    badge: pushData.badge,
    data: {
      notifURL: pushData.url,
    },
  }

  event.waitUntil(self.registration.showNotification(pushData.title, options))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.notifURL))
})

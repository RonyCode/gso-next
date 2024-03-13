self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.showNotification('Push Codelab', {
      body: 'Code was pushed to the cloud!',
      icon: 'images/logo_x72.png',
    }),
  )
})

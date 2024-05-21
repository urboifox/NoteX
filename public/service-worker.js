self.addEventListener('push', (e) => {
    const data = JSON.parse(e.data.text());

    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
    }

    self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

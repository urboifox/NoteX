self.addEventListener('push', (e) => {
    const data = JSON.parse(e.data.text());

    const title = data.title || 'Notex';
    const options = {
        body: 'You have a new notification',
        icon: data.icon || '/icon.png',
    }
    
    self.registration.showNotification(title, options);

    if (data.playAudio) {
        self.clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage({
                    type: "AZAN",
                });
            });
        });
    }
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

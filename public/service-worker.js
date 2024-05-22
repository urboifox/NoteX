console.log('service worker registered');

self.addEventListener('push', (e) => {
    const data = JSON.parse(e.data.text());
    
    console.log('Recieved a push message: ', data);

    const title = data.title || 'Notex';
    const options = {
        body: data.body || 'You have a new notification',
        icon: data.icon || '/icon.png',
    }

    if (data.data.AZAN) {
        console.log('Notification has audio')
        self.clients.matchAll({ includeUncontrolled: true }).then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage({
                    type: "AZAN",
                });
            });
        });
    } else {
        console.log("Notification doesn't have audio");
    }

    self.registration.showNotification(title, options);

});

self.addEventListener('notificationclick', function(event) {
    console.log('User clicked notification');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

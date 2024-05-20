export default function useNotification() {

    async function notify(message: string,  options?: NotificationOptions) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            new Notification(message, options);
        }
    }

    return {
        notify
    }
}
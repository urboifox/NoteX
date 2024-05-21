import { Schema, model, models } from 'mongoose';

const subscriptionSchema = new Schema({
    value: {
        endpoint: { type: String, required: true },
        keys: {
            p256dh: { type: String, required: true },
            auth: { type: String, required: true },
        },
    },
    userId: { type: String, required: true },
});

const Subscription = models.Subscription || model('Subscription', subscriptionSchema);

export default Subscription;
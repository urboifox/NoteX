import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },
    sessionName: {
        type: String,
        required: true,
        default: "Anonymous"
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
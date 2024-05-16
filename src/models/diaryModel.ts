import mongoose, { models } from "mongoose";

const diarySchema = new mongoose.Schema({
    brief: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Diary = models.Diary || mongoose.model("Diary", diarySchema);

export default Diary;
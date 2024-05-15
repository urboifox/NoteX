import mongoose, { models } from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
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

const Article = models.Article || mongoose.model("Article", articleSchema);

export default Article;
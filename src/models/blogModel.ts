import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
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
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    viewsCount: {
        type: Number,
        default: 1,
    },
    viewsIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    coverImage: {
        type: String,
        default: "",
    },
    published: {
        type: Boolean,
        default: false,
    },
    likesIds: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const Blog = models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
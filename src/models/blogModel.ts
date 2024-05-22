import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
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
    views: {
        type: {
            count: Number,
            users: [mongoose.Schema.Types.ObjectId],
        },
        default: {
            count: 0,
            users: [],
        },
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
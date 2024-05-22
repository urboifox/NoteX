import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    islamic: {
        type: Boolean,
        default: true,
    },
    islamicAzkar: {
        type: Boolean,
        default: true,
    },
    islamicAzan: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = models.User || mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    snapshot: {
        type: String,
        required: true
    }
})

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default Board;
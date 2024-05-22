import { TODO_TAGS } from "@/constants";
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: {
    type: Date
  },
  tag: {
    type: {
      name: String,
      color: String
    },
    default: TODO_TAGS[0]
  }
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;
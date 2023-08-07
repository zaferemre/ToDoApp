// models/todo.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);
export { Todo };

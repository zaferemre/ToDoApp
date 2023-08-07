import express from "express";
import mongoose from "mongoose";
import { Todo } from "./models/todo.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;

// Routes
app.get(`/todos`, async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post(`/todos`, async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (deletedTodo) {
      res.json({ message: "To do deleted", deletedTodo });
    } else {
      res.status(404).json({ message: "To do not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while deleting" });
  }
});

app.patch("/todos/:id/toggle", async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "todo not found",
      });
    }

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Can't update **ERROR** " });
  }
});

//Mongo connection
const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zaferce34:<şifre>@cluster0.zak7c2y.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => {
      console.log("App listening port" + PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();

if (typeof document !== "undefined") {
  document.getElementById("todoForm").addEventListener("submit", addTodo);
}

export { start };

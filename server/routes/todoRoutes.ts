import express from "express";
import Todo from "../models/Todo";
import ErrorResponse from "../middleware/ErrorResponse";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ErrorResponse("Title is required", 400));
    }

    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

export default router;

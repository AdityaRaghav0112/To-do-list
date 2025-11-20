import React from "react";
import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onComplete }) => {
  return (
    <div
      className={`todo-item flex items-center justify-between mx-5 my-4 p-3 rounded-xl transition-all
        ${todo.completed ? "bg-green-300" : "bg-blue-200"}
      `}
    >
      <h4
        className={`text-xl ${todo.completed ? "line-through opacity-60" : ""}`}
      >
        {todo.title}
      </h4>

      <div className="flex gap-3">
        <button
          className={`p-2 px-3 rounded-lg text-white cursor-pointer ${
            todo.completed ? "bg-gray-600" : "bg-green-500"
          }`}
          onClick={() => onComplete(todo)}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="bg-red-500 p-2 px-3 text-white rounded-lg cursor-pointer"
          onClick={() => onDelete(todo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

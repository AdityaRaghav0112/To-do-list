import React from "react";
import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div className="todo-item">
      <h4>{todo.title}</h4>
      <p>{todo.desc}</p>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;

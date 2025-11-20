import React from "react";
import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div className="todo-item flex items-center justify-between mx-5 my-4 bg-blue-200 p-3 rounded-xl">
      <h4 className="text-xl">{todo.title}</h4>
      {/* <p>{todo.desc}</p> */}
      <button
        className="bg-red-500 p-2 px-3 text-white rounded-lg cursor-pointer"
        onClick={() => onDelete(todo)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;

import React, { useState } from "react";
import type { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  startEdit: (todo: Todo) => void;
  updateTodo: (sno: number, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onComplete,
  startEdit,
  updateTodo
}) => {
  const [tempTitle, setTempTitle] = useState(todo.title);

  return (
    <div
      className={`todo-item flex font-semibold items-center justify-between mx-5 my-4 p-3 rounded-xl transition-all
        ${todo.completed ? "bg-green-300 cursor-pointer" : "bg-blue-200 cursor-pointer"}
      `}
    >

{/* If editing, show input ------------------------------------------*/}

      {todo.editing ? (
        <input
          className="text-xl p-2 rounded-lg w-full mr-3"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
        />
      ) : (
        <h4
          className={`text-xl ${todo.completed ? "line-through opacity-60" : ""}`}
        >
          {todo.title}
        </h4>
      )}

      <div className="flex gap-3">
        {todo.editing ? (
          <>
            <button
              className="bg-green-500 p-2 px-3 rounded-lg text-white cursor-pointer"
              onClick={() => updateTodo(todo.sno, tempTitle)}
            >
              Save
            </button>

            <button
              className="bg-gray-500 p-2 px-3 rounded-lg text-white cursor-pointer"
              onClick={() => updateTodo(todo.sno, todo.title)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Complete / Undo */}
            <button
              className={`p-2 px-3 rounded-lg text-white cursor-pointer ${
                todo.completed ? "bg-gray-600" : "bg-green-500"
              }`}
              onClick={() => onComplete(todo)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>

            {/* Edit button */}
            <button
              className="bg-yellow-500 p-2 px-3 text-white rounded-lg cursor-pointer"
              onClick={() => startEdit(todo)}
            >
              Edit
            </button>

            {/* Delete */}
            <button
              className="bg-red-500 p-2 px-3 text-white rounded-lg cursor-pointer"
              onClick={() => onDelete(todo)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

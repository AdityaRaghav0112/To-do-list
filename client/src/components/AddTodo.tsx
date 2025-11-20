import React, { useState } from "react";

interface AddTodoProps {
  addTodo: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      alert("Todo is empty");
      return;
    }
    addTodo(title);
    setTitle("");
  };

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <form onSubmit={submit} className="flex gap-2">
          <input
            type="text"
            id="title"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg w-full text-lg"
          />

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-600 duration-300 text-white px-4 py-2 rounded-lg"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;

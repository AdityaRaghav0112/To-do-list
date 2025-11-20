import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

interface TodosProps {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  startEdit: (todo: Todo) => void;
  updateTodo: (sno: number, newTitle: string) =>void;
}

const Todos: React.FC<TodosProps> = ({ todos, onDelete, onComplete, startEdit, updateTodo }) => {

  return (
    <div className="w-screen flex flex-col items-center mt-20">  
    <div className="max-w-5xl w-full">
      <h3 className="my-3 text-3xl font-semibold">Todos list</h3>

      {todos.length === 0
        ? <p className="text-lg text-gray-600">No todos to display !!!</p>
        : todos.map((todo) => (
            <React.Fragment key={todo.sno}>
              <TodoItem todo={todo} onDelete={onDelete} onComplete={onComplete} startEdit={startEdit} updateTodo={updateTodo}/>
            </React.Fragment>
          ))}
    </div>
    </div>
  );
};

export default Todos;

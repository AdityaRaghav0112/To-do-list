import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";

interface TodosProps {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
}

const Todos: React.FC<TodosProps> = ({ todos, onDelete }) => {

  return (
    <div className="container">
      <h3 className="my-3">Todos list</h3>

      {todos.length === 0
        ? "No todos to display"
        : todos.map((todo) => (
            <React.Fragment key={todo.sno}>
              <TodoItem todo={todo} onDelete={onDelete} />
              <hr />
            </React.Fragment>
          ))}
    </div>
  );
};

export default Todos;

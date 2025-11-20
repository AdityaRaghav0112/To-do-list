import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/Todo";
import { motion } from "framer-motion";

interface TodosProps {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
  startEdit: (todo: Todo) => void;
  updateTodo: (sno: number, newTitle: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 , y:-20},
  visible: { opacity: 1 , y:0},
};

const Todos: React.FC<TodosProps> = ({
  todos,
  onDelete,
  onComplete,
  startEdit,
  updateTodo,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-screen flex flex-col items-center mt-20"
    >
      <div className="max-w-5xl w-full">
        <h3 className="my-3 text-3xl font-semibold">Todos list</h3>

        {todos.length === 0 ? (
          <p className="text-lg text-gray-600">No todos to display !!!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.sno}
              todo={todo}
              onDelete={onDelete}
              onComplete={onComplete}
              startEdit={startEdit}
              updateTodo={updateTodo}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Todos;

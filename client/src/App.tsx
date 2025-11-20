import "./App.css";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import About from "./components/About";
import Footer from './components/Footer'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import type { Todo } from "./types/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const initTodo: Todo[] = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos")!)
    : [];

  const [todos, setTodos] = useState<Todo[]>(initTodo);

  const onComplete = (todo: Todo) => {
  const updatedTodos = todos.map((t) =>
    t.sno === todo.sno ? { ...t, completed: !t.completed } : t
  );
  setTodos(updatedTodos);
};

const startEdit = (todo: Todo) => {
  const updated = todos.map((t) =>
    t.sno === todo.sno ? { ...t, editing: true } : t
  );
  setTodos(updated);
};

const updateTodo = (sno: number, newTitle: string) => {
  const updated = todos.map((t) =>
    t.sno === sno ? { ...t, title: newTitle, editing: false } : t
  );
  setTodos(updated);
};

  const onDelete = (todo: Todo) => {
    console.log("I am on delete", todo);
    const updatedTodos = todos.filter((e) => e.sno !== todo.sno);
    setTodos(updatedTodos);
  };

  const addTodo = (title: string,) => {
    console.log("Adding todo:", title);

    const sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;

    const myTodo: Todo = { sno, title };

    setTodos([...todos, myTodo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} onComplete={onComplete}
              startEdit={startEdit} updateTodo={updateTodo}/>
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route
          path="/profile"
          element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} onComplete={onComplete} startEdit={startEdit} updateTodo={updateTodo}/>
            </>
          }
        />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;

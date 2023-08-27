import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [pendingTasks, setPendingTasks] = useState(0);
  const getTodosFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos);
    } else {
      return [];
    }
  };
  const getPendingTasksFromLocalStorage = () => {
    const storedPendingTasks = localStorage.getItem("pendingTasks");
    if (storedPendingTasks) {
      return parseInt(storedPendingTasks);
    } else {
      return 0;
    }
  };
  const addTodo = (todo) => {
    const updatedTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setPendingTasks(pendingTasks + 1);
    localStorage.setItem("pendingTasks", pendingTasks + 1);
  };
  const deleteTodo = (id) => {
    if (window.confirm("Are you sure?")) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setPendingTasks(pendingTasks - 1);
      localStorage.setItem("pendingTasks", pendingTasks - 1);
    }
  };
  const clearAll = () => {
    if (window.confirm("Are you sure?")) {
      setTodos([]);
      setPendingTasks(0);
      localStorage.setItem("todos", "[]");
      localStorage.setItem("pendingTasks", 0);
    }
  };
  useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    setTodos(storedTodos);
    const storedPendingTasks = getPendingTasksFromLocalStorage();
    setPendingTasks(storedPendingTasks);
  }, []);
  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.length === 0 && (
        <small className="small">Please add some tasks...</small>
      )}
      {todos.map((todo) => (
        <Todo key={todo.id} task={todo} deleteTodo={deleteTodo} />
      ))}
      <p className="text">
        You have {pendingTasks} {pendingTasks === 1 ? "task" : "tasks"} pending.
        <button className="clearButton" onClick={clearAll}>
          Clear All
        </button>
      </p>
    </div>
  );
};

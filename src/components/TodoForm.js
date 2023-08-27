import React, { useState } from "react";
export const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("adwdad");
      return;
    }
    addTodo(inputValue);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        required="required"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="todo-input"
        placeholder="Please add your task"
      />
      <button type="submit" className="todo-btn">
        +
      </button>
    </form>
  );
};

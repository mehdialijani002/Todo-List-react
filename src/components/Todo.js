import React from "react";
import image from "../Image/trash-bin.png";
export const Todo = ({ task, deleteTodo }) => {
  return (
    <div className="Todo">
      <p className={`${task.completed ? "completed" : ""}`}>{task.task}</p>
      <img
        src={image}
        className="fa-trash"
        alt="delete"
        onClick={() => deleteTodo(task.id)}
      />
    </div>
  );
};

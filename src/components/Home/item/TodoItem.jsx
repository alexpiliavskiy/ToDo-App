import React, { useEffect, useRef, useState, useContext } from "react";
import cn from "classnames";
import { BsPencil, BsTrash } from "react-icons/bs";
import Check from "./Check";
import Context from "../../Context";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editCurrentTitle, setEditCurrentTitle] = useState(todo.title);
  const editInputTitleRef = useRef(null);

  const value = useContext(Context);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    value.updateTodo(todo.id, editCurrentTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && editInputTitleRef) {
      editInputTitleRef.current.focus();
    }
  }, [isEditing]);

  const handleRemoveTodo = (id) => {
    const alert = window.confirm("Are you sure delete this task?");
    if (alert) {
      value.removeTodo(id);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 rounded-2xl bg-gray-800 p-5 w-full">
      <button
        className="flex items-center"
        onClick={() => value.changeTodo(todo.id)}
      >
        <Check isCompleted={todo.isCompleted} />
        {isEditing ? (
          <form
            onSubmit={handleEditSubmit}
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              ref={editInputTitleRef}
              value={editCurrentTitle}
              onChange={(event) => setEditCurrentTitle(event.target.value)}
              className="bg-transparent w-full border-none outline-none p-1"
            />
          </form>
        ) : (
          <span
            className={cn({
              "line-through": todo.isCompleted,
            })}
          >
            {todo.title}
          </span>
        )}
      </button>
      <div className="ml-auto flex items-center space-x-7">
        {isEditing ? (
          <button onClick={handleEditSubmit}>
            <span className="text-green-400">Save</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <BsPencil
              size={22}
              className="text-gray-600 hover:text-green-400 transition-colors ease-in duration-300"
            />
          </button>
        )}
        <button onClick={() => handleRemoveTodo(todo.id)}>
          <BsTrash
            size={22}
            className="text-gray-600 hover:text-red-700 transition-colors ease-in duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

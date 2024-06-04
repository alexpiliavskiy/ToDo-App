import React, { useState } from "react";

const CreateTodoField = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);

  const addTodo = (title) => {
    if (!title) return;
    setTodos((prev) => [
      {
        id: new Date(),
        title,
        isCompleted: false,
      },
      ...prev,
    ]);
    setTitle("");
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border-gray-800 border-2 px-5 py-3 w-full mb-10">
      <input
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        onKeyDown={(event) => event.key === "Enter" && addTodo(title)}
        className="bg-transparent w-full border-none outline-none"
        placeholder="Add a task..."
      />
    </div>
  );
};

export default CreateTodoField;

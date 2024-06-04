import React, { useState } from "react";

const CreateTodoField = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);

  const addTodo = () => {
    if (!title.trim()) {
      setIsError(true);
      return;
    }
    setIsError(false);
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

  const handleInputChange = (event) => {
    setTitle(event.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between rounded-2xl border-gray-800 border-2 px-5 py-3 w-full mb-10">
      <div className="flex items-center w-full">
        <input
          type="text"
          onChange={handleInputChange}
          value={title}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTodo();
            }
          }}
          className="bg-transparent w-full border-none outline-none"
          placeholder="Add a task..."
        />
        <button
          onClick={addTodo}
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-900 transition-colors ease-in duration-300"
        >
          Add
        </button>
      </div>
      {isError && (
        <span className="text-red-700 font-bold">Field must be not empty!</span>
      )}
    </div>
  );
};

export default CreateTodoField;

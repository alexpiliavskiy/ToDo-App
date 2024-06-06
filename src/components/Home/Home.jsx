import React, { useEffect, useState } from "react";
import TodoItem from "./item/TodoItem";
import CreateTodoField from "./Create-todo-field/CreateTodoField";
import Context from "../Context";

const data = [];

const Home = () => {
  const [todos, setTodos] = useState(data);
  const [counterTodo, setCounterTodo] = useState(0);

  useEffect(() => {
    setCounterTodo(todos.length);
  }, [todos]);

  const changeTodo = (id) => {
    const copy = [...todos];
    const current = copy.find((todo) => todo.id === id);
    current.isCompleted = !current.isCompleted;
    setTodos(copy);
  };

  const removeTodo = (id) => {
    setTodos([...todos].filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: newTitle,
            }
          : todo
      )
    );
  };

  const value = {
    removeTodo,
    changeTodo,
    updateTodo,
    setTodos,
  };

  return (
    <Context.Provider value={value}>
      <div className="text-white w-4/5 mx-auto">
        <span className="font-bold bg-gray-700 p-2 rounded-lg mb-5">
          Total Tasks: {counterTodo}
        </span>
        <h1 className="text-4xl font-bold text-center mb-8 mt-10">To Do App</h1>
        <CreateTodoField />
        {todos.length <= 0 && (
          <p className="font-bold text-red-500">There is no one task!</p>
        )}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </Context.Provider>
  );
};

export default Home;

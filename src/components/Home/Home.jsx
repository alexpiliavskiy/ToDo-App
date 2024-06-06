import React, { useEffect, useState } from "react";
import TodoItem from "./item/TodoItem";
import CreateTodoField from "./Create-todo-field/CreateTodoField";
import Context from "../Context";

const data = [];

const Home = () => {
  const [todos, setTodos] = useState(data);
  const [counterTodo, setCounterTodo] = useState(0);
  const [counterDoneTodo, setCounterDoneTodo] = useState(0);

  useEffect(() => {
    setCounterTodo(todos.length);
    setCounterDoneTodo(todos.filter((todo) => todo.isCompleted).length);
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
          Total Task: {counterTodo}
        </span>
        <span className="font-bold bg-green-600 p-2 rounded-lg ml-5 mb-5">
          Done Task: {counterDoneTodo}
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

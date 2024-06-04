import React, { useState } from "react";
import TodoItem from "./item/TodoItem";
import CreateTodoField from "./Create-todo-field/CreateTodoField";

const data = [];

const Home = () => {
  const [todos, setTodos] = useState(data);

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

  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">To Do App</h1>
      <CreateTodoField setTodos={setTodos} />
      {todos.length <= 0 && (
        <p className="font-bold text-red-500">There is no one task!</p>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          changeTodo={changeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default Home;

import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

function useTodoContext() {
  useContext(TodoContext);
}
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newTodo, setNewTodo] = useState("");

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);

    const newTodos = [...todos];
    newTodos.splice(targetTodoIndex, 1);
    setTodos(newTodos);
  };

  const handleEdit = (e) => {
    const newTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, title: e.target.value } : todo
    );
    setTodos(newTodos);
  };

  const handleCreateNewTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodos = [
        ...todos,
        {
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        },
      ];
      setTodos(newTodos);
      setNewTodo("");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        editId,
        newTodo,
        setNewTodo,
        handleCheck,
        handleDelete,
        handleEdit,
        handleCreateNewTodo,
        setEditId,
      }}
    >
      {child}
    </TodoContext.Provider>
  );
}
export default useTodoContext;

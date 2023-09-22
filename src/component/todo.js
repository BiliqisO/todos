import { useEffect } from "react";
import { useTodoContext } from "./TodoContext";

function Todo() {
  const {
    todos,
    editId,
    newTodo,
    setNewTodo,
    handleCheck,
    handleDelete,
    handleEdit,
    handleCreateNewTodo,
    setEditId,
  } = useTodoContext();
  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          setTodos(data.slice(0, 10));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => (canceled = true);
  }, []);

  return (
    <div className="todo-wrapper">
      <input
        type="text"
        placeholder="Add new"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleCreateNewTodo}>Add</button>
      <ul>
        {!!todos.length &&
          todos.map((todo) => (
            <li
              className="todo"
              key={todo.id}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheck(todo.id)}
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  value={todo.title}
                  onChange={handleEdit}
                />
              ) : (
                <span className={`todo-title ${todo.completed && "checked"}`}>
                  {todo.title}
                </span>
              )}
              {editId === todo.id ? (
                <button onClick={() => setEditId(null)}>✅</button>
              ) : (
                <button
                  className="del-button"
                  onClick={() => setEditId(todo.id)}
                  disabled={todo.completed}
                >
                  ✏️
                </button>
              )}
              <button
                className="del-button"
                onClick={() => handleDelete(todo.id)}
              >
                🗑️
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Todo;

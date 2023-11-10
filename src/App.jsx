import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [newTodo, setNewTodo] = useState(" ")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TODOS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    return localStorage.setItem("TODOS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(event) {
    event.preventDefault();

    setTodos(currentTodos => {
      return [...currentTodos, {id: currentTodos.length + 1, title: newTodo, completed: false}]
    })
    setNewTodo(" ")
  }

  
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function handleDelete(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return ( 
    <div className="container">
      <form onSubmit={handleSubmit} className="new-todo">
        <div className="add-todo">
          <label htmlFor="todo">
            <span className="visually-hidden">New Todo</span>
          </label>
          <input value={newTodo}
            onChange={e => setNewTodo(e.target.value)} 
            className="new-todo_input" placeholder="What needs to be done?" />
        </div>
          <button className="add-todo_button" type="submit">
            Add Todo
          </button>
      </form>
      <h1 className="todo-title">Todo List</h1>
      <ul className="todo-list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => (
          <li className="todo" key={todo.id}>
            <input className="todo-checkbox" type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            
            <span className="todo-name">{todo.title}</span>
            <button className="todo-delete" 
            onClick={() => handleDelete(todo.id)}>Delete
            </button>
          </li>
        ))}
        </ul>
    </div>
   );
}

export default App;
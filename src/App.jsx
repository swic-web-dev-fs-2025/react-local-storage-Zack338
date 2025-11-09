import useTodos from "./hooks/useTodos";
import "./App.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function App() {
  const { todos, text, setText, addTodo, handleKeyPress } = useTodos();

function useTodos() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return; 
    const newTodo = { id: Date.now(), text: text.trim() };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };


  return { todos, text, setText, addTodo, handleKeyPress };
}

export default function App() {
  const { todos, text, setText, addTodo, handleKeyPress } = useTodos();

  return (
    <div className="App">

      <h1>Persistent Todo App</h1>

      <h1>Persistent Todo App 📝</h1>


      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {(todos || []).map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <p className="note">
        Refresh the page—your todos are still here thanks to localStorage!
      </p>
    </div>
  );
}

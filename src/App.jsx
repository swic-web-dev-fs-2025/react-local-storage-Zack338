import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./App.css";

export default function App() {
  // useLocalStorage hook automatically syncs todos with localStorage
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    const newTodo = { id: Date.now(), text: text.trim() };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="App">
      <h1>Persistent Todo App 📝</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <p className="note">
        Refresh the page — your todos are still here thanks to localStorage!
      </p>
    </div>
  );
}

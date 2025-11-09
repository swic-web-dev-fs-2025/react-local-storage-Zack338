import useTodos from "./hooks/useTodos";
import "./App.css";

export default function App() {
  const { todos, text, setText, addTodo, handleKeyPress } = useTodos();

  return (
    <div className="App">
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
        Refresh the page your todos are still here thanks to localStorage!
      </p>
    </div>
  );
}

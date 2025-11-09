import { useEffect, useState } from "react";

// Small local useLocalStorage hook to avoid an external dependency.
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      // If parsing fails, fall back to initialValue
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write errors (e.g., storage full or disabled)
    }
  }, [key, state]);

  return [state, setState];
}

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text: text.trim() };
    setTodos([...(todos || []), newTodo]);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return { todos, text, setText, addTodo, handleKeyPress };
}

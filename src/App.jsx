import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // ADD TODO
  function handleAddTodo(text) {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      description: text,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  // DELETE TODO
  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // START EDIT
  function handleEditStart(todo) {
    setEditId(todo.id);
    setEditText(todo.description);
  }

  // SAVE EDIT
  function handleEditSave(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, description: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-200 w-[50%] ml-[25%] mt-10">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        React Todo Application
      </h1>

      <div className="bg-white rounded-xl shadow-md w-full p-6">
        <AddTodo onAddTodo={handleAddTodo} />
        <DisplayTodo
          todos={todos}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          onDelete={handleDeleteTodo}
          onEditStart={handleEditStart}
          onEditSave={handleEditSave}
        />
      </div>
    </div>
  );
};

export default App;

// ---------------- ADD TODO ----------------
function AddTodo({ onAddTodo }) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="grow border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          onAddTodo(text);
          setText("");
        }}
      >
        Add ➕
      </button>
    </div>
  );
}

// ---------------- DISPLAY / EDIT / DELETE ----------------
function DisplayTodo({
  todos,
  editId,
  editText,
  setEditText,
  onDelete,
  onEditStart,
  onEditSave,
}) {
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg mb-2 shadow-sm"
        >
          {editId === todo.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border rounded px-2 py-1 grow mr-2"
            />
          ) : (
            <span className="text-gray-700 font-medium">
              {todo.description}
            </span>
          )}

          <div className="flex gap-3 text-lg cursor-pointer">
            {editId === todo.id ? (
              <span onClick={() => onEditSave(todo.id)}>💾</span>
            ) : (
              <span onClick={() => onEditStart(todo)}>✏</span>
            )}
            <span onClick={() => onDelete(todo.id)}>🗑</span>
          </div>
        </div>
      ))}
    </div>
  );
}

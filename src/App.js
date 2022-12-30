import { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

function getStoredData() {
  const list = localStorage.getItem("list");
  if (!list.length) {
    return [];
  } else {
    return JSON.parse(list);
  }
}

let editObj = {};

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState(getStoredData());
  const [isEdit, setIsEdit] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  function showAlert(show = false, msg = "", type = "") {
    setAlert({ show, msg, type });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      showAlert(true, "Please Enter Value", "danger");
    } else if (input && isEdit) {
      todoList.forEach((todo) => {
        if (todo.id === editObj.id) {
          todo.title = input;
        }
      });
      showAlert(true, "Value Changed", "success");
    } else {
      const newItem = {
        id: Date.now(),
        title: input.trim(),
      };
      setTodoList([...todoList, newItem]);
      showAlert(true, "Item Added To The List", "success");
    }

    setInput("");
    setIsEdit(false);
  }

  function editTodo({ id, title }) {
    editObj = { id, title };
    setInput(title);
    setIsEdit(true);
  }

  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
    showAlert(true, "Item Removed", "danger");
  }

  function clearAll() {
    setTodoList([]);
    showAlert(true, "Empty List", "danger");
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  // In this way we can hide the alert here also

  /* 
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [todoList, alert]) */

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} hideAlert={showAlert} todoList={todoList} />
        )}
        <h3>Todo App</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEdit ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {todoList.length > 0 && (
        <div className="grocery-container">
          <List
            todoList={todoList}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
          <button className="clear-btn" onClick={clearAll}>
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;

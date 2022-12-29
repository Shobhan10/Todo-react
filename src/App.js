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
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      setIsAlert(true);
      setAlert({
        msg: "Please Enter Value",
        success: false,
      });
    }

    if (input && isEdit) {
      todoList.forEach((todo) => {
        if (todo.id === editObj.id) {
          todo.title = input;
        }
      });
      setIsAlert(true);
      setAlert({
        msg: "Value Changed",
        success: true,
      });
    }

    if (input && !isEdit) {
      const newItem = {
        id: Date.now(),
        title: input.trim(),
      };
      setTodoList([...todoList, newItem]);
      setIsAlert(true);
      setAlert({
        msg: "Item Added To The List",
        success: true,
      });
    }

    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
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

    setIsAlert(true);
    setAlert({
      msg: "Item Removed",
      success: false,
    });
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  function clearAll() {
    setTodoList([]);

    setIsAlert(true);
    setAlert({
      msg: "Empty List",
      success: false,
    });
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {isAlert && <Alert {...alert} />}
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

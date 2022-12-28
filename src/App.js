import { useState } from "react";
import Alert from "./Alert";
import List from "./List";

let myTodo = [];
const previousTodo = JSON.parse(localStorage.getItem("list"));
if (!previousTodo.length) {
  myTodo = [];
} else {
  myTodo = previousTodo;
}

let editObj = {};

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState(myTodo);
  const [isEdit, setIsEdit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (input && isEdit) {
      myTodo.forEach((todo) => {
        if (todo.id === editObj.id) {
          todo.title = input;
        }
      });
    }

    if (input && !isEdit) {
      myTodo.push({
        id: Date.now(),
        title: input.trim(),
      });
    }

    setInput("");
    setTodoList(myTodo);
    setIsEdit(false);

    localStorage.setItem("list", JSON.stringify(myTodo));
  }

  function editTodo({ id, title }) {
    editObj = { id, title };
    setInput(title);
    setIsEdit(true);
  }

  function deleteTodo(id) {
    myTodo = myTodo.filter((todo) => todo.id !== id);
    localStorage.setItem("list", JSON.stringify(myTodo));
    setTodoList(myTodo);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* <Alert /> */}
        <h3>Grocery Bud</h3>
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
      <List todoList={todoList} editTodo={editTodo} deleteTodo={deleteTodo} />
    </section>
  );
}

export default App;

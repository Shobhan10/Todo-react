import { useState } from "react";
import Alert from "./Alert";
import List from "./List";

let myTodo = [];
localStorage.setItem("list", JSON.stringify(myTodo));
const previousTodo = JSON.parse(localStorage.getItem("list"));
if (!previousTodo.length) {
  myTodo = [];
} else {
  myTodo = previousTodo;
}

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState(myTodo);

  function handleSubmit(e) {
    e.preventDefault();

    if (todo) {
      myTodo.push({
        id: Date.now(),
        title: todo.trim(),
      });
    }

    setTodo("");
    setTodoList(myTodo);

    localStorage.setItem("list", JSON.stringify(myTodo));
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
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      <List todoList={todoList} />
    </section>
  );
}

export default App;

import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ todoList, editTodo, deleteTodo }) => {
  if (todoList.length) {
    return (
      <div className="grocery-container">
        <div className="grocery-list">
          {todoList.map((todo) => {
            const { id, title } = todo;
            return (
              <div className="grocery-item" key={id}>
                <p className="title">{title}</p>
                <div className="btn-container">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editTodo(todo)}
                  >
                    <FaEdit />
                  </button>
                  <button type="button" className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="clear-btn">Clear items</button>
      </div>
    );
  }
};

export default List;

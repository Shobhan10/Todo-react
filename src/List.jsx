import { FaEdit, FaTrash } from "react-icons/fa";

const List = () => {
  return (
    <div className="grocery-container">
      <div className="grocery-list">
        <div className="grocery-item">
          <p className="title"></p>
          <div className="btn-container">
            <button type="button" className="edit-btn">
              <FaEdit />
            </button>
            <button type="button" className="delete-btn">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <button className="clear-btn">Clear items</button>
    </div>
  );
};

export default List;

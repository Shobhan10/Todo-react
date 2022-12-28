import Alert from "./Alert";
import List from "./List";

function App() {
  return (
    <section className="section-center">
      <form className="grocery-form">
        {/* <Alert /> */}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            // value
          />
          <button type="submit" className="submit-btn">
            submit
          </button>
        </div>
      </form>
      <List />
    </section>
  );
}

export default App;

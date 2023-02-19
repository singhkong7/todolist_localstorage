import "./styles.css";
import { useState, useEffect } from "react";

const getItemsFromLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
export default function App() {
  // getItemsFromLocalStorage();
  const [inputTextValue, setInputTextValue] = useState("");
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [todoList, setTodoList] = useState(getItemsFromLocalStorage());
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [updateInputValue, setUpdateInputValue] = useState("");

  const handleAddItem = () => {
    let todoSingleValue = {
      id: Math.floor(Math.random() * 1000),
      content: inputTextValue,
      completed: checkedStatus
    };
    setTodoList([...todoList, todoSingleValue]);
  };

  console.log("todoList Info", todoList);
  const handleRemoveItem = (element, key) => {
    console.log(key, element);
    setTodoList(todoList.filter((item, value) => value !== key));
  };
  const handleUpdateButton = (element, key) => {
    setModalStatus(true);
    setSelectedValue({ element, key });
  };
  const updateValueHandler = () => {
    console.log("clicked");
    setTodoList(
      todoList.map((element) => {
        if (element.id === selectedValue.element.id) {
          element.content = updateInputValue;
          return element;
        }
        return element;
      })
    );
    setTimeout(() => {
      setModalStatus(false);
      setUpdateInputValue("");
    }, 0);
  };
  console.log("selected Value", selectedValue);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todoList));
  }, [todoList]);
  console.log("Water", localStorage.getItem("list"));
  return (
    <div className="App">
      <h2>Todo list</h2>
      <div className="todos_functions">
        <div>
          <p>You can empty your Todolist here!!!</p>
          <button
            className="empty_todo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTodoList([]);
            }}
          >
            Empty List
          </button>
        </div>
        <div>
          <p>Filter all completed todos!!!</p>
          <button
            className="empty_todo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTodoList(
                todoList.filter((element) => element.completed === true)
              );
            }}
          >
            Filter List
          </button>
        </div>
        <div>
          <p>Filter all Uncompleted todos!!!</p>
          <button
            className="empty_todo"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTodoList(
                todoList.filter((element) => element.completed !== true)
              );
            }}
          >
            Filter List
          </button>
        </div>
      </div>
      <div className="todo_input_box">
        <input
          type="text"
          placeholder="Enter your content"
          value={inputTextValue}
          onChange={(e) => setInputTextValue(e.target.value)}
        />
        <div style={{ display: "flex", gap: "0.1rem" }}>
          <p>Completetion Status:</p>
          <input
            type="checkbox"
            checked={checkedStatus}
            onChange={() => setCheckedStatus((prev) => !prev)}
          />
        </div>
        <button style={{ cursor: "pointer" }} onClick={handleAddItem}>
          Add
        </button>
      </div>
      <div className="todo_list">
        {todoList?.map((element, key) => (
          <div className="todo_list_item" key={key}>
            <h3>Content:{element?.content}</h3>
            <h5>
              Completetion Status:{" "}
              {element?.completed === false ? "Not Completed" : "Completed"}
            </h5>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <button
                className="success_button"
                onClick={() => {
                  handleUpdateButton(element, key);
                }}
              >
                Update
              </button>
              <button
                className="empty_todo"
                onClick={() => handleRemoveItem(element, key)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalStatus ? (
        <div className="modal_section">
          <div
            className="modal_close_button"
            onClick={() => {
              setModalStatus(false);
            }}
          >
            X
          </div>
          <p className="modal_title">Update Item</p>
          <input
            type="text"
            value={updateInputValue}
            onChange={(e) => setUpdateInputValue(e.target.value)}
          />
          <button className="modal_button" onClick={updateValueHandler}>
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

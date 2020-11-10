import React from "react";
import "./AddTodo.css";

const AddTodo = ({ setInputText, setTodos, todos, inputText, setStatus }) => {
  const inputTextHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const addTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    setInputText("");   //To automatically set Input field empty when btn clicked
  };

  const statusHandler = (e) => {
      setStatus(e.target.value)
  }

  return (
    <div className="add_todo">
      <form>
        <div className="row-one">
          <input onChange={inputTextHandler} value={inputText} type="text" className="todo-input" placeholder="What do you need to do today?" />
          <button onClick={addTodoHandler} className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
          </button>
        </div>
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </form>
    </div>
  );
};

export default AddTodo;

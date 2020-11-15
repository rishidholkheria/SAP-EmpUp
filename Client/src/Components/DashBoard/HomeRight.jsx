// import { Widgets } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import AddTodo from "../Todo/AddTodo";
import TodoList from "../Todo/TodoList";
import "./HomeRight.css";
import Goal from "./Goal";

const HomeRight = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("hi");
    filterHandler();
    saveToLocalStorage();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getFromLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localtodo = JSON.parse(localStorage.getItem("todos"));
      setTodos(localtodo);
    }
  };
  return (
    <div className="widgets">
      <div className="monthly_goal">
        <Goal />
      </div>

      <div className="right-todo">
        <AddTodo
          inputText={inputText}
          todos={todos}
          setTodos={setTodos}
          setInputText={setInputText}
          setStatus={setStatus}
        />

        <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
        />
      </div>
      <div className="right-calender"></div>
    </div>
  );
};
export default HomeRight;

import React, { Component } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    fetch("http://reacttodo.somee.com/api/todos/getall")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          todos: data,
        });
      })
      .catch((err) => console.error(err));
  };

  addTodo = (name) => {
    fetch("http://reacttodo.somee.com/api/todos/addnew", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          name: name,
          completed: false
      })
    })
    .then(response => response.json())
    ;
  };

  render() {
    const todoList = this.state.todos.map((todo) => (
      <Todo
        key={todo.id}
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
      />
    ));

    const todosNoun = todoList.length !== 1 ? "todos" : "todo";
    const headingText = `${todoList.length} ${todosNoun} remaining`;

    return (
      <div className="todoapp stack-large">
        <Form addTodo={this.addTodo} />
        <div className="filters btn-group stack-exception"></div>
        <h2 id="list-heading" tabIndex="-1">
          {headingText}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {todoList}
        </ul>
      </div>
    );
  }
}

export default App;

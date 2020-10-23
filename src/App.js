import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

class App extends Component {
  state = {
    error: null,
    todos: [],
    response: {},
    filter: "All",
  };

  FILTER_MAP = {
    All: () => true,
    Active: (todo) => todo.completed === false,
    Completed: (todo) => todo.completed === true,
  };
  FILTER_NAMES = Object.keys(this.FILTER_MAP);
  setFilter = (name) => {
    this.setState({ filter: name });
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    fetch("https://vast-beyond-69394.herokuapp.com/api/todos")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          todos: data,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  addTodo = (name) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://vast-beyond-69394.herokuapp.com/api/todos", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        completed: false,
      }),
      myHeaders,
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todos: [...this.state.todos, result],
        });
      });
  };

  toggleTodoCompleted = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex((t) => t.id === id);
    const data = {
      name: todos[index].name,
      completed: !todos[index].completed,
    };

    return fetch("https://vast-beyond-69394.herokuapp.com/api/todo/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((retData) => {
        this.setState((prevState) => {
          const updatedTodos = prevState.todos.map((todo) => {
            if (todo.id === retData.id) {
              todo.completed = retData.completed;
            }
            return todo;
          });
          return {
            todos: updatedTodos,
          };
        });
      });
  };

  deleteTodo = (id) => {
    fetch("https://vast-beyond-69394.herokuapp.com/api/todo/" + id, {
      method: "DELETE",
    }).then(() => {
      this.setState((prevState) => {
        const updTodos = prevState.todos.filter((t) => t.id !== id);
        return {
          todos: updTodos,
        };
      });
    });
  };

  editTodo = (id, newName) => {
    const { todos } = this.state;
    const index = todos.findIndex((t) => t.id === id);
    const data = {
      name: newName,
      completed: todos[index].completed,
    };
    return fetch("https://vast-beyond-69394.herokuapp.com/api/todo/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((retData) => {
        this.setState((prevState) => {
          const editedTodos = prevState.todos.map((t) => {
            if (t.id === retData.id) {
              return { ...t, name: retData.name };
            }
            return t;
          });
          return {
            todos: editedTodos,
          };
        });
      });
  };

  render() {
    const todoList = this.state.todos
      .filter(this.FILTER_MAP[this.state.filter])
      .map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          name={todo.name}
          completed={todo.completed}
          toggleTodoCompleted={this.toggleTodoCompleted}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
        />
      ));

    const filterList = this.FILTER_NAMES.map((name) => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === this.state.filter}
        setFilter={this.setFilter}
      />
    ));

    const todosNoun = todoList.length !== 1 ? "todos" : "todo";
    const headingText = `${todoList.length} ${todosNoun} remaining`;

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/">
              <div className="todoapp stack-large">
                <Form addTodo={this.addTodo} />
                <div className="filters btn-group stack-exception">
                  {filterList}
                </div>
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
            </Route>
            <Route path='/about' component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

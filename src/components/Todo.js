import React, { Component } from "react";

class Todo extends Component {
  state = {
    isEditing: false,
    newName: ''
  }

  handleChange = (e) => {
    this.setState({
      newName: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editTodo(this.props.id, this.state.newName);
    this.setState({newName: '', isEditing: false});
  }
  render() {
    const completedStyle = {
      fontStyle: "italic",
      color: "#cdcdcd",
      textDecoration: "line-through",
    };

    const editingTemplate = (
      <form className="stack-small" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={this.props.id}>
            New name for {this.props.name}
          </label>
          <input
            id={this.props.id}
            className="todo-text"
            type="text"
            value={this.state.newName}
            onChange={this.handleChange}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => {this.setState({isEditing: false})}}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
          </button>
        </div>
      </form>
    );

    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            disabled={this.props.completed}
            defaultChecked={this.props.completed}
            onChange={() => this.props.toggleTodoCompleted(this.props.id)}
          />
          <label
            className="todo-label"
            htmlFor={this.props.id}
            style={this.props.completed ? completedStyle : null}
          >
            {this.props.name}
          </label>
        </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn" 
            disabled={this.props.completed}
            onClick = {() => {this.setState({isEditing: true})}}
          >
            Edit <span className="visually-hidden">{this.props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => this.props.deleteTodo(this.props.id)}
          >
            Delete <span className="visually-hidden">{this.props.name}</span>
          </button>
        </div>
      </div>
    )

    return (
      <li className="todo">{this.state.isEditing ? editingTemplate : viewTemplate}</li>
    );
  }
}

export default Todo;

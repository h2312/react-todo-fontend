import React, { Component } from "react";

class Todo extends Component {
  render() {
    return (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            defaultChecked={this.props.completed}
          />
          <label className="todo-label" htmlFor={this.props.id}>
            {this.props.name}
          </label>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn"
          >
            Edit <span className="visually-hidden">{this.props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
          >
            Delete <span className="visually-hidden">{this.props.name}</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;

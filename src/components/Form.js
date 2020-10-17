import React, { Component } from "react";

class Form extends Component {
    state = {
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {value} = e.target;
        if(value !== ''){
            this.props.addTodo(value);
            this.setState({ name: ''})
        } else {
            alert("Can't add empty value!");
        }
    }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
}

export default Form;

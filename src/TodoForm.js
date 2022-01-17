import React, {Component} from 'react';
import './TodoForm.css';

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {inputValue: ''};
    this.handleChange = this.handleChange.bind(this);  // bind the 'this' context to TodoForm
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value  // update the state based on input value
    });
  }

  handleSubmit(e) {
    this.props.addTodo(this.state.inputValue);  // function passdown from TodoList
  }

  render() {
    return (
      <div>
        <input type="text" 
               value={this.state.inputValue} 
               onChange={this.handleChange}
        />
        <button
          onClick={this.handleSubmit}
        >Add Todo
        </button>     
      </div>      
    )
  }
}

export default TodoForm;
import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css'
import * as apiCalls from './api';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []  // create an empty state 1st
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentWillMount(){ 
        this.loadTodos();
    }

    async loadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }

    async addTodo(val){
        let newTodo = await apiCalls.createTodo(val);       

        // add newTodo to the state and update the front end
        this.setState({todos: [...this.state.todos, newTodo]})        
    }

    async deleteTodo(id){
        await apiCalls.removeTodo(id);        
        // filter out the deleted todo id and update our front end
        const todos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: todos});         
    }

    async toggleTodo(todo) {        
        let updatedTodo = await apiCalls.updateTodo(todo);
     
        // update the completed status of todo in front end
        const todos = this.state.todos.map(t =>  
                (t._id === updatedTodo._id)        // if id is updatedTodo id
                ? {...t, completed: !t.completed}  // flip it complete state
                : t                                // leave it as it is
        );
        this.setState({todos: todos});         
    }

    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
                key={t._id}  // _id from MongoDB automatic id field for each item input
                {...t}  // spread operator to get all other object properties
                onDelete={this.deleteTodo.bind(this, t._id)}  // 'this' belong to each todo so it must be binded here : only need to pass the id here
                onToggle={this.toggleTodo.bind(this, t)}  // pass the whole todo item to the function to get its done status
            />
        ));
        return (  // always need an outer div to wrap all content  // passdown addTodo function to TodoForm
            <div>  
                <h1>Todo List</h1>
                <TodoForm addTodo={this.addTodo}/>   
                <ul>
                    {todos}
                </ul>
            </div>          
            
        )
    }
}

export default TodoList;
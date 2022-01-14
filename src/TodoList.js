import React, {Component} from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'
const APIURL = '/api/todos';

class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
    }

    componentWillMount(){ 
        this.loadTodos();
    }

    loadTodos() {
        fetch(APIURL)  // add a proxy http://locahost:8080 to package.json so here we do not need to input localhost
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >=400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: 'Please try again'};
                    throw err;
                }
            }
            return resp.json();
        })        
        .then(todos => this.setState({todos}));
    }

    render() {
        const todos = this.state.todos.map((t) => (
            <TodoItem
                key={t._id}  // _id from MongoDB automatic id field for each item input
                {...t}  // spread operator to get all other object properties
            />
        ));
        return (  // always need an outer div to wrap all content
            <div>  
                <h1>Todo List</h1>
                <ul>
                    {todos}
                </ul>
            </div>          
            
        )
    }
}

export default TodoList;
import React from 'react';
import './TodoItem.css';

// simple li item with no state => just create a function, not class
const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li>
    <span 
      style={{
      textDecoration: completed? 'line-through' : 'none'  // add style to list to show a strike through done items
    }} 
      onClick={onToggle}
    >
      {name}
    </span>    
    <span onClick={onDelete}> X </span>
  </li>
);

export default TodoItem;
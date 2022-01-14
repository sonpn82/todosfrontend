import React from 'react';
import './TodoItem.css';

// simple li item with no state => just create a function, not class
const TodoItem = ({name}) => (
  <li>
    {name}
  </li>
);

export default TodoItem;
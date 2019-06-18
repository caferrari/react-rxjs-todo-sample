import React, { memo } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';

const MegaToDo: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <ToDoList />
    </div>
  );
}

export default memo(MegaToDo);
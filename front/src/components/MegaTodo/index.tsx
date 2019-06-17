import React, { memo } from 'react';
import Header from './Header';
import ToDos from './ToDos';

const MegaToDo: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <ToDos />
    </div>
  );
}

export default memo(MegaToDo);
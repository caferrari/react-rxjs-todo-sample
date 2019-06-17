import { List } from '@material-ui/core';
import React, { memo, useContext } from 'react';

import { TodoContext } from './context';
import ToDoItem from './ToDoItem';
import Loader from 'shared/components/Loader';

const Items: React.FC = () => {
  const { items } = useContext(TodoContext)

  return (
    <List>
      {
      !!items
        ? items.map(item => <ToDoItem key={item.id} value={item}></ToDoItem>)
        : <Loader />
      }
    </List>
  );
}

export default memo(Items);
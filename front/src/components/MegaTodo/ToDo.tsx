import { Card, CardContent, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { IToDo } from 'interfaces/IToDo';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useObservable } from 'react-use-observable';
import { combineLatest, map } from 'rxjs/operators';
import { filterService } from 'services/filter';
import { todoItemServiceFactory } from 'services/todoItems';

import AddToDo from './AddToDo';
import { ITodoContext, TodoContext } from './context';
import ToDoItems from './ToDoItems';
import ToDoActions from './ToDoActions';
import ToDoHeader from './ToDoHeader';

interface IProps {
  todo: IToDo
}

const useStyles = makeStyles(theme => ({
  card: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

const ToDo: React.FC<IProps> = ({ todo }) => {
  const classes = useStyles();

  const { current: service } = useRef(todoItemServiceFactory(todo.id));
  const [ creating, setCreating ] = useState(false);

  const [ items ] = useObservable(() => {
    return service.load().pipe(
      combineLatest(filterService.getFilter()),
      map(([items, filter]) => {
        if (!filter) {
          return items;
        }
        return items.filter(i => i.text.toLowerCase().includes(filter))
      })
    )
  }, [todo.id]);

  const createAction = useCallback(() => setCreating(true), []);
  const closeDialogs = useCallback(() => setCreating(false), []);

  if (!service || !items || !todo) {
    return null;
  }

  const contextValue: ITodoContext = {
    todo,
    items,
    service,
    createAction,
    closeDialogs
  };

  return (
    <TodoContext.Provider value={contextValue}>
      <Card className={classes.card}>
        <ToDoHeader />
        {
        items.length > 0 && <CardContent>
          <ToDoItems />
        </CardContent>
        }
        <ToDoActions />
      </Card>
      { creating && <AddToDo /> }
    </TodoContext.Provider>
  );
}

export default memo(ToDo);
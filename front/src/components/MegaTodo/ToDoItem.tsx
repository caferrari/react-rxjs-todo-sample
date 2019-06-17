import {
  Checkbox,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { IToDoItem } from 'interfaces/ITodoItem';
import React, { memo, useCallback, useContext } from 'react';
import { useObservable } from 'react-use-observable';

import { TodoContext } from './context';

interface IProps {
  value: IToDoItem
}

const ToDoItem: React.FC<IProps> = ({ value: item }) => {

  const { service } = useContext(TodoContext);

  const [ isLoading ] = useObservable(() => service.isItemLoading(item.id), [service, item.id]);

  const removeHandler = useCallback(() => service.removeItem(item.id).subscribe(), [service, item.id])
  const checkHandler = useCallback((event) => {
    service.checkItem(item.id, event.target.checked).subscribe();
  }, [service, item.id]);

  return (
    <ListItem role={undefined} dense button>
      <ListItemIcon>
        {
        isLoading
          ? <CircularProgress variant="indeterminate" size={20} />
          : <Checkbox
            edge="start"
            onChange={checkHandler}
            checked={item.done}
            disabled={isLoading}
            tabIndex={-1}
            disableRipple
          />
        }
      </ListItemIcon>
      <ListItemText primary={item.text} />
      <ListItemSecondaryAction>
        <IconButton onClick={removeHandler} disabled={isLoading} edge="end" aria-label="Comments">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(ToDoItem);
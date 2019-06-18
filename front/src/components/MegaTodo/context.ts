import React from 'react';
import { IToDo } from 'interfaces/IToDo';
import { IToDoItem } from 'interfaces/ITodoItem';
import { TodoItemService } from 'services/todoItems';

export interface ITodoContext {
  todo: IToDo;
  items?: IToDoItem[],
  service: TodoItemService,
  createAction: () => void,
  closeDialogs: () => void
}

export const TodoContext = React.createContext<ITodoContext>({
  todo: undefined as any,
  items: [],
  service: undefined as any,
  createAction: () => null,
  closeDialogs: () => null
});
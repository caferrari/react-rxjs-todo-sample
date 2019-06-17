import { IToDoItem } from './ITodoItem';

export interface IToDo {
  id: string;
  title: string;
  items?: IToDoItem[]
}
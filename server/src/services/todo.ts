import { IToDo } from 'interfaces/IToDo';
import { v4 } from 'node-uuid';
import { IToDoItem } from 'interfaces/ITodoItem';

class ToDoService {

  private todos: IToDo[] = [{
    title: 'Teste',
    id: 'abc',
    items: [
      {
        id: 'abc',
        text: 'teste',
        done: false
      }
    ]
  },
  {
    title: 'Sbrubles',
    id: 'def',
    items: [
      {
        id: 'cpto',
        text: 'teste',
        done: false
      }
    ]
  }];

  public all(): IToDo[] {
    return this.todos.map(todo => ({
      id: todo.id,
      title: todo.title
    }));
  }

  public getItems(listId: string): IToDoItem[] {

    const list = this.todos.find(todo => todo.id === listId);

    if (!list) {
      return []
    }

    return list.items || [];

  }

  public addItem(listId: string, todoItem: IToDoItem): IToDoItem {
    const list = this.todos.find(list => list.id === listId);

    if (!list) {
      throw new Error('Todo List not found');
    }

    list.items = list.items || [];

    list.items.push(todoItem);

    return todoItem;
  }

  public removeItem(listId: string, todoId: string): void {
    const list = this.todos.find(list => list.id === listId);

    list.items = list.items.filter(item => item.id !== todoId);
  }

  public checkItem(listId: string, todoId: string, done: boolean): void {
    const list = this.todos.find(list => list.id === listId);

    const item = list.items.find(item => item.id === todoId);

    item.done = done;
  }

  public createList(title: string): IToDo {
    const todo = {
      id: v4(),
      title,
      items: []
    };

    this.todos.push(todo);

    return todo;
  }

}

export const toDoService = new ToDoService();
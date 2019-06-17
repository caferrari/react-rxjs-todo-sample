import { IToDoItem } from 'interfaces/ITodoItem';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { distinctUntilChanged, finalize, tap, switchMap, take, catchError, map } from 'rxjs/operators';
import { api } from 'shared/services/api';
import { v4 } from 'node-uuid';

export class TodoItemService {

  private loading$ = new BehaviorSubject<boolean>(false);
  private items$ = new BehaviorSubject<IToDoItem[]>([]);
  private itemLoading$ = new BehaviorSubject<{[key: string]: boolean}>({});

  constructor(private todoId: string) { }

  load = () => {
    this.loading$.next(true);
    return api.get<IToDoItem[]>(this.todoId)
      .pipe(
        finalize(() => this.loading$.next(false)),
        tap(items => this.items$.next(items)),
        switchMap(() => this.list())
      );
  }

  list = () => this.items$.asObservable();

  isLoading = () => {
    return this.loading$.asObservable().pipe(
      distinctUntilChanged()
    )
  }

  addItem = (text: string) => {
    const item = {
      id: v4(),
      text,
      done: false
    };

    const currentLoading = { ...this.itemLoading$.value};
    currentLoading[item.id] = true;

    this.itemLoading$.next(currentLoading);

    const oldList = this.items$.value;

    return this.items$.pipe(
      take(1),
      switchMap(list => {
        this.items$.next([...list, item]);
        return api.post<IToDoItem>(this.todoId, item)
      }),
      catchError((err: any) => {
        this.items$.next(oldList);
        throw err;
      }),
      finalize(() => {
        const currentLoading = {...this.itemLoading$.value};
        delete currentLoading[item.id];
        this.itemLoading$.next(currentLoading);
      })
    );
  }

  removeItem = (id: string) => {

    const oldList = this.items$.value;

    return this.items$
      .pipe(
        take(1),
        switchMap(list => {
          const newList = list.filter(i => i.id !== id);
          this.items$.next(newList);
          return api.delete<IToDoItem>(`${this.todoId}/${id}`);
        }),
        catchError((err: any) => {
          console.log(err);
          this.items$.next(oldList);
          throw err;
        })
      );
  }


  isItemLoading = (id: string): Observable<boolean> => {
    return this.itemLoading$.pipe(
      map(list => list[id]),
      distinctUntilChanged()
    );
  }

  checkItem = (itemId: string, done: boolean) => {

    const oldItems = this.items$.value;

    return this.items$.pipe(
      take(1),
      switchMap(items => {
        const newList = [...items];
        const currentItem = oldItems.find(i => i.id === itemId);

        if (!currentItem) {
          return empty();
        }

        const index = items.indexOf(currentItem);

        const newItem = {...currentItem, done };

        newList[index] = newItem;

        this.items$.next(newList);

        return api.post<IToDoItem>(`${this.todoId}/${itemId}/check`, { done })
      }),
      catchError((err: any) => {
        this.items$.next(oldItems);
        throw err;
      })
    );

  }

}

export const todoItemServiceFactory = (todoId: string) => {
  return new TodoItemService(todoId);
}
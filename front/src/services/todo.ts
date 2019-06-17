import { IToDo } from 'interfaces/IToDo';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, finalize } from 'rxjs/operators';
import { api } from 'shared/services/api';

class ToDoService {

  private todo$ = new BehaviorSubject<IToDo[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);

  load = (): void => {
    this.loading$.next(true);
    api.get<IToDo[]>('/')
      .pipe(
        finalize(() => this.loading$.next(false))
      )
      .subscribe(todos => this.todo$.next(todos));
  }

  isLoading = () => {
    return this.loading$.asObservable().pipe(
      distinctUntilChanged()
    )
  }

  list = () => {
    return this.todo$.asObservable();
  }


}

export const todoService = new ToDoService();
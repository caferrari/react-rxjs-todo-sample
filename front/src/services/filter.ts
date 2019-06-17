import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

class FilterService {

  private filter$ = new BehaviorSubject('');

  setFilter(text: string) {
    this.filter$.next(`${text}`.toLowerCase());
  }

  getFilter() {
    return this.filter$.pipe(
      distinctUntilChanged()
    )
  }

}

export const filterService = new FilterService();
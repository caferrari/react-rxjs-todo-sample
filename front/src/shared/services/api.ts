import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { API_URL } from 'settings';

type httpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequestOptions<D> {
  data?: D
}

class Api {

  constructor(private apiUrl: string) { }

  get<T>(url: string) {
    return this.request<T>('GET', url);
  }

  post<T, D = any>(url: string, data: D) {
    return this.request<T>('POST', url, {
      data
    });
  }

  delete<T>(url: string) {
    return this.request<T>('DELETE', url);
  }

  request<T = any, D = any>(method: httpVerb, url: string, options: IRequestOptions<D> = {}): Observable<T> {

    return of(true)
      .pipe(
        switchMap(() => {
          const promise = axios.request<T>({
            method,
            baseURL: API_URL,
            url,
            data: options.data
          });

          return from(promise);
        }),
        map(result => result.data),
        tap(() => null, (err) => console.error(err))
      )

  }

}

export const api = new Api(API_URL)
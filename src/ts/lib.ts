import { Observable, Observer } from 'rxjs';

let dbIndex: number = 0;
const searchStorage: Map<number, HttpResponse> = new Map<number, HttpResponse>();

export interface HttpResponse {
  _id: number;
  value: string;
  isDone: boolean;
}

export const createTodoItem = (value: HttpResponse) => {
  const result = <HTMLElement> document.createElement('LI');
  result.classList.add('list-group-item');
  const innerHTML = `${value._id}
  <button type="button" class="btn btn-default btn-del" aria-label="right Align">
                             删除
                            </button>`;
  result.innerHTML = innerHTML;
  return result;
};

export const mockHttpPost: (value: string) => Observable<HttpResponse> = (value: string): Observable<HttpResponse> => {
  return Observable.create((observer: Observer<HttpResponse>) => {
    let status: string = 'pending';
    const timmer: number = setTimeout(() => {
      const result: HttpResponse = {
        _id: ++dbIndex, value,
        isDone: false
      };
      searchStorage.set(result._id, result);
      status = 'done';
      observer.next(result);
      observer.complete();
    }, Math.random() * (1000 - 10) + 10);
    return () => {
      clearTimeout(timmer);
      if (status === 'pending') {
        console.warn('post canceled');
      }
    };
  });
};
import '../css/normalize.css';
import '../css/index.css';

import { Observable } from 'rxjs';
import { createTodoItem } from './lib';

const $input: HTMLInputElement | null = <HTMLInputElement> document.querySelector('.input-text');
const $list: HTMLUListElement | null = <HTMLUListElement> document.querySelector('#list');
const $add: HTMLButtonElement | null = <HTMLButtonElement> document.querySelector('.btn-add');

const $clickAdd: any = Observable.fromEvent<MouseEvent>($add, 'click');
const $enter: any = Observable.fromEvent<KeyboardEvent>($input, 'keydown').filter((event: KeyboardEvent): boolean => event.keyCode === 13);
const _input: any = $enter.merge($clickAdd);

const $app: any = _input
  .map((): string|number => $input.value)
  .filter((value: string | number): boolean => { return value !== ''; })
  .map(createTodoItem)
  .do((element: HTMLLIElement) => {
    $list.appendChild(element);
    $input.value = '';
  })
  .mergeMap(($todoItem: HTMLElement) => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
    .filter((event: MouseEvent): boolean => event.target === $todoItem).mapTo($todoItem);
  })
  .do(($todoItem: HTMLElement) => {
    if ($todoItem.classList.contains('done')) {
      $todoItem.classList.remove('done');
    } else {
      $todoItem.classList.add('done');
    }
  })
  .do((value: string|number): void => console.dir(value));
$app.subscribe();
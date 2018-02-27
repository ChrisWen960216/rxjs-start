import '../css/normalize.css';
import '../css/index.css';

import { Observable } from 'rxjs';
import { createTodoItem } from './lib';

const $input: HTMLInputElement | null = <HTMLInputElement> document.querySelector('.input-text');
const _input: any = Observable.fromEvent<KeyboardEvent>($input, 'keydown').filter((event: KeyboardEvent): boolean => event.keyCode === 13);
const $list: HTMLUListElement | null = <HTMLUListElement> document.querySelector('#list');

const $app: any = _input
  .map((): string|number => $input.value)
  .filter((value: string | number): boolean => { return value !== ''; })
  .map(createTodoItem)
  .do((element: HTMLLIElement) => {$list.appendChild(element); })
  .do((value: string|number): void => console.dir(value));
$app.subscribe();
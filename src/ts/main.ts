import { Observable, Subject } from 'rxjs';
import { createTodoItem, mockHttpPost } from './lib';

import '../css/normalize.css';
import '../css/index.css';

const $input = <HTMLInputElement> document.querySelector('.input-text');
const $list = <HTMLUListElement> document.querySelector('#list');
const $add = <HTMLButtonElement> document.querySelector('.btn-add');

const $clickAdd = Observable.fromEvent<MouseEvent>($add, 'click');
const $enter = Observable.fromEvent<KeyboardEvent>($input, 'keydown').filter((event: KeyboardEvent): boolean => event.keyCode === 13);
const _input: any = $enter.merge($clickAdd);

const $clearInputSubject = new Subject<void>();

const $item = _input
  .map(() => $input.value)
  .filter((value: string | number) => { return value !== ''; })
  .distinct(null, $clearInputSubject)
  .switchMap(mockHttpPost)
  .map(createTodoItem)
  .do((element: HTMLLIElement) => {
    $list.appendChild(element);
    $input.value = '';
  })
  .publishReplay(1)
  .refCount();

const $toogle: any = $item
  .mergeMap(($todoItem: HTMLElement) => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
      .filter((event: MouseEvent): boolean => event.target === $todoItem)
      .mapTo($todoItem);
  })
  .do(($todoItem: HTMLElement) => {
    if ($todoItem.classList.contains('done')) {
      $todoItem.classList.remove('done');
    } else {
      $todoItem.classList.add('done');
    }
  });

const $del: any = $item
  .mergeMap(($todoItem: HTMLElement) => {
    const $delBtn: HTMLButtonElement | null = <HTMLButtonElement> $todoItem.querySelector('.btn-del');
    return Observable.fromEvent<MouseEvent>($delBtn, 'click')
      .mapTo($todoItem);
  })
  .do(($todoItem: HTMLElement) => {
    const $parent: Node | null = $todoItem.parentNode;
    if ($parent) {
      $parent.removeChild($todoItem);
    }
  });

  const $app: any = $toogle.merge($del);

$app.subscribe();
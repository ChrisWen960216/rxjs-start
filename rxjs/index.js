import Rx from 'rxjs/Rx';

const rxBtn = document.getElementById('rxjs-btn');

Rx.Observable.fromEvent(rxBtn, 'click')
  .subscribe(() => console.log('Hello World'));


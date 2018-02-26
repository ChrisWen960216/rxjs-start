import Rx from 'rxjs/Rx';

const rxBtn = document.getElementById('rxjs-btn');

const count = 0;

Rx.Observable.fromEvent(rxBtn, 'click')
  .throttleTime(1000)
  .map(e => e.clientX)
  .scan((count, clinetX) => count + clinetX, 0)
  .subscribe(count => console.log(count));


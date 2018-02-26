const Rx = require('rxjs/Rx');

// 创建一个Observable,当订阅时触发事件
const observable = Rx.Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

// 订阅
console.log('Just before subscribe');
observable.subscribe({
  next: x => console.log(`Got Value${x}`),
  error: error => console.log(`Something is in a mess${error}`),
  complete: () => console.log('Completed'),
});
console.log('Just After Subscribe');

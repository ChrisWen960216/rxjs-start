class Observer {
  constructor() {
    this.listenQueue = [];
  }

  // 订阅队列
  listen(fn) {
    this.listenQueue.push(fn);
  }

  // 发布
  trigger(arg) {
    const { listenQueue } = this;
    for (let i = 0; i < listenQueue.length; i += 1) {
      const fn = listenQueue[i];
      fn.call(this, arg);
    }
  }
}

const Test = new Observer();
Test.listen((data) => { console.log(data); });
Test.listen((data) => { console.log(`${data}AHAHAHH`); });
Test.trigger('HAHA');
Test.trigger(2000);
// export default Observer;

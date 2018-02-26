class Observer {
  constructor() {
    this.listenQueue = [];
    this.listenObj = {};
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

  filterListen(key, fn) {
    if (!this.listenObj[key]) {
      this.listenObj[key] = [];
    }
    this.listenObj[key].push(fn);
  }

  filterTrigger(eventName, arg) {
    const key = eventName;
    const fns = this.listenObj[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0; i < fns.length; i += 1) {
      const fn = fns[i];
      fn.call(this, arg);
    }
    return true;
  }
}

const Test = new Observer();
Test.filterListen('Say', (data) => { console.log(data); });
Test.filterTrigger('Say', 'HAHA');
// Test.trigger(2000);
// export default Observer;

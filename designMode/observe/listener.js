class Observer {
  constructor() {
    this.listenQueue = [];
    this.listenObj = {};
  }

  // // 订阅队列
  // listen(fn) {
  //   this.listenQueue.push(fn);
  // }

  // // 发布
  // trigger(arg) {
  //   const { listenQueue } = this;
  //   for (let i = 0; i < listenQueue.length; i += 1) {
  //     const fn = listenQueue[i];
  //     fn.call(this, arg);
  //   }
  // }

  listen(key, fn) {
    if (!this.listenObj[key]) {
      this.listenObj[key] = [];
    }
    this.listenObj[key].push(fn);
  }

  trigger(...args) {
    const key = Array.prototype.shift.call(args);
    const fns = this.listenObj[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0; i < fns.length; i += 1) {
      const fn = fns[i];
      fn.call(this, ...args);
    }
    return true;
  }

  remove(key, fn) {
    const fns = this.listenObj[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns.length = 0;
      return fns;
    }

    for (let i = fns.length - 1; i >= 0; i -= 1) {
      const _fn = fns[i];
      if (_fn === fn) {
        fns.splice(i, 1);
      }
    }
    return true;
  }
}

export default Observer;

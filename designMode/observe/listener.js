class Observer {
  constructor() {
    this.listenQueue = [];
    this.listenObj = {};
    this.cache = {};
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
    if (this.cache[key]) {
      fn.call(this.cache[key]);
      delete this.cache[key];
    }
    // if (!this.listenObj[key]) {
    //   this.listenObj[key] = [];
    // }
    // this.listenObj[key].push(fn);
    // if (!this.listenObj[key]) {
    //   this.listenObj[key] = [];
    // }
    // this.listenObj[key].push(fn);
  }

  // listen(key, fn) {
  //   const _fn = fn || null;
  //   if (!this.listenObj[key]) {
  //     this.listenObj[key] = [];
  //   }
  //   const index = this.listenObj[key].indexOf(null);
  //   if (index > -1) {
  //     this.listenObj[key][index] = _fn;
  //   } else {
  //     this.listenObj[key].push(_fn);
  //   }
  // }

  trigger(...args) {
    const key = Array.prototype.shift.call(args);
    const fns = this.listenObj[key];
    if (!fns || fns.length === 0) {
      this.cache[key] = args;
      return this.cache;
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

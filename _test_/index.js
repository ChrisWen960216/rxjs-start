class Test {
  constructor(ele) {
    this.ele = ele;
  }

  print() {
    console.log(this.ele);
  }
}

const TESTS = new Test('a');
TESTS.print();

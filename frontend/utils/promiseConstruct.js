// @ts-nocheck
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  //私有属性
  #state = PENDING;
  #result = undefined;
  #handler = []; //多次then方法调用
  //
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    }; //this执向和函数调用有关，用箭头函数确保this指向
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(state, result) {
    if (this.#state !== PENDING) {
      return;
    }
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  #run() {
    if (this.#state === PENDING) {
      return;
    }

    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handler.shift();
      if (this.#state === FULFILLED) {
        //当前状态已完成，并且promisethen传递了第一个参数是函数
        if (typeof onFulfilled === "function") {
          onFulfilled(this.#result);
        }
      } else {
        if (typeof onRejected === "function") {
          onRejected(this.#result);
        }
      }
    }
  }

  //then方法 什么时候调用onFulfilled，什么时候调用onRejected
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handler.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
      //
    });
  }
}

//
// new Promise((resolve, reject) => {
//    resolve(1)
// })
const p = new MyPromise((res, rej) => {
  setTimeout(() => {
    rej("123"); //promise 构造函数的回调执行，如果是异步抛错，捕获不到
  }, 1000);
});
console.log(p);
p.then(
  (res) => {
    console.log("res", res);
  },
  (rej) => {
    console.log("rej", rej);
  }
);
p.then(
  (res) => {
    console.log("res", res);
  },
  (rej) => {
    console.log("rej", rej);
  }
);
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     throw 123; //promise 构造函数的回调执行，如果是异步抛错，捕获不到
//   }, 0);
// });

// @ts-nocheck
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  //私有属性
  #state = PENDING;
  #result = undefined;
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
    console.log("state", this.#state);
  }
}

//
// new Promise((resolve, reject) => {
//    resolve(1)
// })
const p = new MyPromise((res, rej) => {
  res("123"); //promise 构造函数的回调执行，如果是异步抛错，捕获不到
});
console.log(p);

new Promise((resolve, reject) => {
  setTimeout(() => {
    throw 123; //promise 构造函数的回调执行，如果是异步抛错，捕获不到
  }, 0);
});

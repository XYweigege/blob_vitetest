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
  // 判断是不是promise
  #isPromiseLike(value) {
    //根据promiseA+规范 ,只要满足的都是promise
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }

  //微队列
  #runMicroTask(func) {
    //区分node 还是浏览器环境
    //node环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
    }
    //浏览器环境
    else if (typeof MutationObserver === "function") {
      // MutationObserver是个观察期，调用观察期会将东西加到微任务队列
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = 2;
    }

    //不知道啥环境 兜底了
    else {
      setTimeout(func, 0);
    }
  }

  #runOne(callback, resolve, reject) {
    //放微任务队列执行。
    this.#runMicroTask(() => {
      //promiseThen 回调三种情况
      //情况一 then的回调不是个函数
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      // 情况二 callback是函数 ,看函数的返回值是成功还是失败
      try {
        const data = callback(this.#result);

        //情况三 回调是一个函数 并且该回调返回一个promise
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  #run() {
    if (this.#state === PENDING) {
      return;
    }

    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handler.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
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
// const p = new MyPromise((res, rej) => {
//   setTimeout(() => {
//     res("123"); //promise 构造函数的回调执行，如果是异步抛错，捕获不到
//   }, 1000);
// });
// p.then(null, (rej) => {
//   console.log("rej", rej);
// }).then(
//   (data) => {
//     console.log("ok", data);
//   },
//   (rej) => {}
// );
// p.then(
//   (res) => {
//     console.log("res", res);
//   },
//   (rej) => {
//     console.log("rej", rej);
//   }
// );
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     throw 123; //promise 构造函数的回调执行，如果是异步抛错，捕获不到
//   }, 0);
// });

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(123);
//   }, 1000);
// });

// p.then(null, (err) => {
//   console.log("失败", err);
// }).then((data) => {
//   console.log("ok", data);
// });

setTimeout(() => {
  console.log(1);
}, 0);
new MyPromise((resolve) => {
  resolve(2);
}).then((data) => {
  console.log("data", data);
});

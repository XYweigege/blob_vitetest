# 手写 Promise

## 手写 promise 构造器

```js
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

const p = new MyPromise((res, rej) => {
  res("123"); //promise 构造函数的回调执行，如果是异步抛错，捕获不到
});
console.log(p);

new Promise((resolve, reject) => {
  setTimeout(() => {
    throw 123; //promise 构造函数的回调执行，如果是异步抛错，捕获不到
  }, 0);
});
```

## 手写 promise All

```js
Promise.myAll = function (proms) {
  let res;
  let rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let i = 0;
  const result = [];
  for (const prom of proms) {
    const index = i;
    i++;
    Promise.resolve(prom).then((data) => {
      //1.将完成的数据加入到最终结果
      result[index] = data;

      //2.判断是否全部完成
      i--;
      if (i === 0) {
        //全部完成
        res(result);
      }
    }, rej);
  }
  if (i === 0) {
    res([]);
  }
  return p;
};
```

## promise.then 方法

```js
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
```

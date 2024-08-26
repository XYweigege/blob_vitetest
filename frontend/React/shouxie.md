### 1.js 将数字每千分位用逗号隔开

在 JavaScript 中，你可以使用 toLocaleString 方法将数字格式化为带有千分位逗号的字符串。这个方法会根据你所在地区的本地化设置来格式化数字。
以下是一个简单的例子：

```js
let num = 1234567.89;
let formattedNum = num.toLocaleString();
console.log(formattedNum); // 输出可能是 "1,234,567.89"
```

在这个例子中，toLocaleString 方法会自动在数字的千分位处添加逗号。注意，输出的格式可能会因你的本地化设置而异。
如果你想要确保输出的格式不受本地化设置的影响，你可以为 toLocaleString 方法提供一个选项对象，明确指定你想要的语言环境（locale）。例如，如果你想要使用美国英语的格式（即使用逗号作为千分位分隔符，点作为小数点），你可以这样做：

```js
let num = 1234567.89;
let formattedNum = num.toLocaleString("en-US");
console.log(formattedNum); // 输出 "1,234,567.89"
```

### 2.手写防抖节流

在 JavaScript 中，防抖（debounce）和节流（throttle）是两种常用的优化高频触发事件的策略。它们通常用于窗口大小调整、滚动、输入等场景，以减少事件处理函数的执行频率，提高性能。
防抖（Debounce）
防抖是指事件被触发后，n 秒内函数只能执行一次，如果在这 n 秒内又被触发，则重新计算执行时间。

下面是一个简单的防抖函数实现：

```js
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
// 使用示例
const myEfficientFn = debounce(function () {
  // 需要防抖执行的函数
}, 250);
window.addEventListener("resize", myEfficientFn);
```

### 节流（Throttle）

节流是指连续触发事件，但在 n 秒内只执行一次函数。

下面是一个简单的节流函数实现

```js
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return (inThrottle = false);
      }, limit);
    }
  };
}
// 使用示例
const myEfficientFn = throttle(function () {
  // 需要节流执行的函数
}, 250);
window.addEventListener("scroll", myEfficientFn);
```

这两个函数都返回一个新的函数，这个新函数会包装传入的原始函数，并根据防抖或节流的逻辑来调用它。
防抖和节流的区别在于，防抖是在事件触发后等待一段时间再执行，而节流是确保事件触发后的一段时间内只执行一次。
这两个函数都可以接受任意数量的参数，并将它们传递给原始函数。
在实际应用中，你可能需要根据你的需求对这两个函数进行扩展或调整。

## https://juejin.cn/post/7353456468094599205#heading-5

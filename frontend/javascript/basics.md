css 基础

## 方法

### 对象数组去重

```js
const arr = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, b: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { b: 2, a: 1 } },
];

function unique(arr) {
  let copy_arr = [...arr];
  for (let i = 0; i < copy_arr.length; i++) {
    for (let j = i + 1; j < copy_arr.length; j++) {
      if (equals(copy_arr[j], copy_arr[i])) {
        copy_arr.splice(j, 1);
        j--;
      }
    }
  }
}

const isObject = (val) => typeof val === "object" && val !== null;
function equals(val1, val2) {
  if (isObject(val1) && isObject(val2)) {
    const key1 = Object.keys(val1);
    const key2 = Object.keys(val2);
    if (key1.length !== key2.length) {
      return false;
    }
    for (const k of key1) {
      if (!key2.includes(k)) {
        return false;
      }
      if (!equals(val1[k], val2[k])) {
        return false;
      }
    }
    return true;
  } else {
    return val1 === val2;
  }
}

console.log(unique(arr));
```

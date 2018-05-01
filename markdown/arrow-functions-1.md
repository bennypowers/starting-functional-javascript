## Old-School Functions

```js
function identity(x) {
  return x;
}

function prod(a, b) {
  return a * b;
}

function addAll(...args) {
  return args.reduce(function reducer(a, c) {
    return a + Number(c) || 0;
  }, 0);
}

addAll(1, 2, 3); // 6
```

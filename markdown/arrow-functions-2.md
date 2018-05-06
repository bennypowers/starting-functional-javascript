## ES2015 Arrow Functions
```js
const identity = x => x;                            // single param

const prod = (a, b) => a * b;                       // multiple params need ()

const addAll = (...args) =>                         // implicit return
  args.reduce((a, c) => a + Number(c) || 0, 0);

const prodByMax = (range, ...args) => {             // multi-statement function body
  const max = Math.max(...range);                   // assignment statement
  return max * [...args].reduce(prod, 1);           // explicit return
};

identity(1)             // 1
prod(2, 3)              // 6
addAll(1, 2, 3);        // 6
prodByMax([1, 3], 1, 3) // 9
```

## Arrow Functions
```js
const identity = x => x;                            // single param

const prod = (a, b) => a * b;                       // multiple params need ()



const addAll = (...args) =>                         // implicit return
  args.reduce((a, c) => a + Number(c) || 0, 0);

  addAll(1, 2, 3); // 6



const prodByMax = (range, ...args) => {             // multi-statement function body
  const max = Math.max(...range);                   // assignment statement
  return max * [...args].reduce(prod, 1);           // explicit return
};
```

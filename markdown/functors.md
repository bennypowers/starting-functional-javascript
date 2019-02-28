```js
const inc = x => x + 1

[1].map(inc) // [2]

Promise.resolve(2)
  .then(inc) // Promise 3
```  

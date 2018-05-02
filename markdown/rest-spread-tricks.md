## Array Tail
```js
const tail = ( [ , ...rest ]) => rest

tail([1, 2, 3, 4]) // [2, 3, 4]
```

## Array Shallow Copy
```js
const copy = xs => [...xs]

const orig = [ 1, 2, 3 ]
const newA = copy(orig)

newA[0] = 'one'

console.log(newA) // ["one", 2, 3]
console.log(orig) // [1, 2, 3]
```

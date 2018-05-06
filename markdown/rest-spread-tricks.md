## Array Tail
```js
const tail = ( [ , ...rest ]) => rest

tail([1, 2, 3, 4]) // [2, 3, 4]
```

## Array Shallow Copy
```js
const orig = [ 1, 2, 3 ]
const copy = [...orig]

copy[0] = 'one'

console.log(copy) // ["one", 2, 3]
console.log(orig) // [1, 2, 3]
```

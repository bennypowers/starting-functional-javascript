```js
const firstAndRest = (first, ...rest) =>      // rest aka gather
  console.log(first, ...rest)                 // spread

const nAry = (...args) => {                   // gather args
  const [ , snd, ...rest] = args               // gather rest
  console.log(
    'snd: ', snd,
    'rest: ', rest
  )
}

firstAndRest(1, 2, 3, 4)                      // 1 2 3 4
nAry(1, 2, 3, 4, 5)                           // snd: 2 rest: [3, 4, 5]
```

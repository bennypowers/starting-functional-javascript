```js
const map = f => xs => xs.map(f)
const some = p => xs => xs.some(p)
const filter = p => xs => xs.filter(p)

const split = d => str => str.split(d)
const assign = a => o => ({ ...o, ...a })
```

```js
const addTwice2 = compose(add(2), add(2))

const deepSerialClone = compose(JSON.parse, JSON.stringify)

// composing predicates
const isSame = x => y => x === y

const isAdmin = compose(
  isSame('admin'),
  propOr(null, 'role')
)
```

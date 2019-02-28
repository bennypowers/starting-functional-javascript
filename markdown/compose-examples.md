```js
const addTwice2 = compose(add(2), add(2))

const deepSerialClone = compose(JSON.parse, JSON.stringify)

const isAdmin = compose(
  x => x === 'admin',
  ({ role }) => role
)
```

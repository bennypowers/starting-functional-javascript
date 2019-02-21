```js
const handleAsJson = resp => resp.json()

fetch('/users')
  .then(handleAsJson)
  .then(filter(isAdmin))
  .then(map(assign({admin: true}))
```

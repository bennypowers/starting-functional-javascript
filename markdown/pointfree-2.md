```js
import filter from 'crocks/pointfree/filter'
import map from 'crocks/pointfree/map'
import assign from 'crocks/helpers/assign'

fetch('/users')
  .then(handleAsJson)
  .then(filter(isAdmin))
  .then(map(assign({admin: true}))
```

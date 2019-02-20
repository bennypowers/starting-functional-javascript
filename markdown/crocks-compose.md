```js
import compose from 'crocks/helpers/compose'

const addTwice2 = compose(add(2), add(2))

const deepSerialClone = compose(JSON.parse, JSON.stringify)

// composing predicates
import isSame from 'crocks/predicates/isSame'

const isAdmin = compose(isSame('admin'), propOr(null, 'role'))
```

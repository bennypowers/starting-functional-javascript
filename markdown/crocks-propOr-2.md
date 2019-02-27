```js
import propOr from 'crocks/helpers/propOr'

// helpers are curried by default
const getName = propOr(null, 'name')

getName({ name: 'Forter' }) // 'Forter'
```

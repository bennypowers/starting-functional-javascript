```js
import propOr from 'crocks/helpers/propOr'

const getName = propOr(null, 'name')

getName({ name: 'Forter' }) // 'Forter'
```

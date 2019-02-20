```js
import propOr from 'crocks/helpers/propOr'

propOr(null, 'name', { name: 'Forter' }) // 'Forter'
propOr(null, 'name', { date: '2019' })   // null
```

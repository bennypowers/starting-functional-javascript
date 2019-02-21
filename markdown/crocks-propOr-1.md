```js
import propOr from 'crocks/helpers/propOr'

// propOr :: A -> String -> {[String]: A} -> A
propOr(null, 'name', { name: 'ftr' })   // 'ftr'
propOr(null, 'name', { date: '2019' })  // null
```

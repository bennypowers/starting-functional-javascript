```js
import curry from 'crocks/helpers/curry'

const wellCurried = curry(
  (x, y) => z => (foo, bar) => 'baz'
)

wellCurried(1) // curry((y, z, foo, bar) => 'baz')
wellCurried(1, 2, 3) // curry((foo, bar) => 'baz')
```

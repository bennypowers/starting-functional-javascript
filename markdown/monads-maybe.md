```js
import { Maybe, safe, isNumber } from 'crocks'

const safeNumber = safe(isNumber)

const safeAdd = (x, y) => {
  const maybeX = safeNumber(x)
  const maybeY = safeNumber(y)
  return maybeX.chain(
    x_ => maybeY.map(y_ => x_ + y_)
  )
}

safeAdd(1, 2)         // Maybe 3
safeAdd(1, null)      // Nothing
safeAdd('רק', 'ביבי') // Nothing
```

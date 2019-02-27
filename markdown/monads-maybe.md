```js
import { Maybe, safe, isNumber } from 'crocks';

const safeNumber = safe(isNumber)

const safeAdd = (x, y) => {
  const maybeA = safeNumber(a)
  const maybeB = safeNumber(b)
  return maybeA.chain(
    valA => maybeB.map(valB => valA + valB)
  )
}

safeAdd(1, 2)    // Maybe 3
safeAdd(1, null) // Nothing
safeAdd('רק', 'ביבי') // Nothing
```

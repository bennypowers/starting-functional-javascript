```js
import { ifElse, isNumber, Just, Nothing, chain } from 'crocks'

const safe = p => ifElse(p, Just, Nothing)

const gt10 = x => x > 10;

const safeNumber = safe(isNumber)

const maybeBig = safe(gt10)

const bigNumber = compose(
  chain(maybeBig),
  safeNumber
)
```

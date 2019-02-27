```js
import { liftA2 } from 'crocks';

const add = (x, y) => x + y;

const safeAdd = (x, y) =>
  liftA2(add, safeNumber(x), safeNumber(y))
```

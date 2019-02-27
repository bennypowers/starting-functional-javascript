```js
import isNil from 'crocks/predicates/isNil'
import not from 'crocks/logic/not'

const isTruthy = not(isNil)
const isUser = compose(isTruthy, propOr(null, 'token'))
const hasFriends = compose(x => x.length, propOr([], 'friends'))

const isFriendly = and(isUser, hasFriends)
const isUnfriendly = not(isFriendly)
```

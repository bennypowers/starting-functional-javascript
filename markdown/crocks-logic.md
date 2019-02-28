```js
import { propOr, compose, isTruthy, not, and, or } from 'crocks'

const isUser = compose(isTruthy, propOr(null, 'token'))
const isRich = compose(x => x > 1000, propOr(0, 'balance'))
const hasFriends = compose(x => x.length, propOr([], 'friends'))

const isFriendly = and(isUser, hasFriends)
const isUnfriendly = not(isFriendly)
const shouldFriend = or(isFriendly, isRich)
```

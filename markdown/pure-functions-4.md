```js
const resolveUser = ({ token }, { userModel: { isValidToken, fetchUser } }) =>
  isValidToken(token)
    ? () => fetchUser(token)
    : async () => null

```

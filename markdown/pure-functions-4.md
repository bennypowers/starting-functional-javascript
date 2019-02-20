```js
// isValidToken :: Token -> Promise Boolean
// fetchUser :: Token -> Promise User
async function resolve({ token }, { userModel: { isValidToken, fetchUser } }) {
  if (await isValidToken(token)) return fetchUser(user)
  else return null
}
```

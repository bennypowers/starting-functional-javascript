```js
const lastFollower = async ({ userId }) => {
  try {
    const response = await fetch(`/users/${userId}`)
    const user = handleAsJson(response)
    const followers = await Promise.all(user.followers.map(fetchProfileUrl));
    const lastFollower = head([...followers].reverse())
    return lastFollower;
  } catch (e) {
    throw new Error('Could Not Fetch Last Follower', e)
  }
}

fetch('/users/sari')
  .then(handleAsJson)
  .then(lastFollower)
  .then(console.log)
  .catch(console.warn)
```

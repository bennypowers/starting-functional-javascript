## Helpful When Passing Object Params

```js
const render =
  ({ user_name: name, thumb: picture }) => // alias keys from server response
    renderUser({ name, picture })          // Pass Object params concisely

fetch('/users/1479')
  .then(handleAsJson)
  .then(render)
```

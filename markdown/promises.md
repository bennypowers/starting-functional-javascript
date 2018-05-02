```js
const promise = url = new Promise(
  (resolve, reject) =>
    ajax('url', response =>
      response.ok ? resolve(response.body) : reject(response.error)
    )
  )

promise('http://blink.gg/about#roee-k')
  .then(console.log)
  .catch(console.warn)
```

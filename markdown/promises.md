```js
const promise = url = new Promise(
  (resolve, reject) =>
    fetch('http://some.url')
      .then(response => response.ok
          ? resolve(response.body)
          : reject(response.error))
  )

promise('http://blink.gg/about#Roee')
  .then(console.log)
  .catch(console.warn)
```

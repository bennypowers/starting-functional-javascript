```js
const alex = {
  videoProcessing: true,
  effects: 100,
}
```  


## Old-School Two-Step Access then Assign

```js
const effects = alex.effects                    // We refer to `awesome` twice!

console.log( effects < 100 ? '💔' : '🐸')       // 🐸
```


## Destructure and Assign in One Step
By only naming our property once, we reduce the chance for typos and 🐛.
```js
const { videoProcessing } = alex;

console.log( videoProcessing ? '📽️' : '🎵')    // 📽️
```

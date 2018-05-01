```js
const params = {
  awesome: true,
  yolo: true,
  maga: false,
}
```  


## Old-School Two-Step Access then Assign

```js
const awesome = params[awesome]      // We refer to `awesome` twice!

if (awesome) console.log('🐸')       // 🐸
```


## Destructure and Assign in One Step
By only naming our property once, we reduce the chance for typos and 🐛.
```js
const { maga } = params;

console.log( maga ? '😷' : '🌴')     // 🌴
```

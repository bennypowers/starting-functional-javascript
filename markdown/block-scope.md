## Old School IIFEs
Functions used to be the only way to get a private scope.
```js
(function PrivateScope() {
  var priv = true;
  console.log(priv ? '😎' : '😢')     // 😎
}());

console.log(priv)                     // Uncaught ReferenceError: priv is not defined
```

## New Hotness Blockscope

```js
if (partyTime) {
  const awesome = true;
  var globally = true;
  console.log(awesome ? '😎' : '😢')  // 😎
}

console.log(awesome)                  // Uncaught ReferenceError: awesome is not defined
console.log(globally)                 // true - var is still function-scoped
```

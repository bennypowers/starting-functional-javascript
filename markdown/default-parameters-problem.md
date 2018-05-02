## The Problem: Defining Meaningful Defaults for Optional Params
```js
function foo(bar, options) {
  return bar( options.baz === 'qux' ? 'ploni' : 'almoni' )
}

foo(console.log)  // OOPS! Forgot to pass `options`! 🤦‍♂️
                  // TypeError: Cannot read property 'baz' of undefined
```

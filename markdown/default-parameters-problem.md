## The Problem: Defining Meaningful Defaults for Optional Params

```js
function setDeptHead(setter, options) {
  return setter( options.dept === 'office' ? 'Miriam' : 'Yair' )
}

setDeptHead(console.log)  // OOPS! Forgot to pass `options`! 🤦‍♂️
                          // TypeError: Cannot read property 'dept' of undefined
```

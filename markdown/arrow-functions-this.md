# Old-School Dynamic `this`
```js
function logThis() {
  console.log(this);                      // defaults to window.
}

logThis();                                // window 🤷‍♂️

function asyncThis(event) {
  setTimeout(logThis);
}

document.body.onclick = asyncThis;        // window! 👿
```

# Lexically Bound `this` via Arrow Functions
```js
const asyncArrowThis = function(event) {  // event handler's this is the element
  setTimeout(() => console.log(this))     // this is lexically bound to body
}

document.body.onclick = asyncArrowThis    // <body> 😎
```

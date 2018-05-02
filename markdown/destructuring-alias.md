## Aliasing Properties
Super useful when different APIs use different names.
```js
const biker = {
  user_name: 'Dov',
  trail_kph: 25,
}

const { user_name: nickName, trail_kph: speed } = biker;

console.log(nickName, speed > 12 ? '🔥' : '🙄')         // Dov 🔥
```

## Aliasing Properties
Super useful when different APIs use different names.




```js



const data = {
  user_name: 'Ronen',
}

const { user_name: nickName } = data;

console.log(nickName)     // Ronen
```

## ES2015 Template Literals
```js
const hello = user => `${user.greeting}, ${user.name}! What's up?`

hello({ name: 'Shai', greeting: 'Hey' })          // Hey, Shai! What's up?
```

### Preserves \\n
```js
const whitespaced =
  `🐢
  all
  the
  way
  down`

console.log(whitespaced.replace(/\n/g, ' '))      // 🐢 all the way down
```

## Old-School String Concatenation
```js
function hello(user) {
  return user.greeting + ',' + user.name + '! What\'s up?'
}

hello({ name: 'Bill', greeting: 'Hey' })           // Hey, Bill! What's up?
```

## Template Literals
```js
const hello = user => `${user.greeting}, ${user.name}! What's up?`

hello({ name: 'Bill', greeting: 'Hey' })           // Hey, Bill! What's up?
```

## Preserves \\n
```js
const whitespaced = `Turtles
all
the
way
down`

console.log(whitespaced.replace(/\n/g, '💩')) // Turtles💩all💩the💩way💩down
```

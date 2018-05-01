const user = { name: 'Bill', greeting: 'Hey' }

const hello = user =>
  `${user.greeting}, ${user.name}! What's up?`

hello(user)           // Hey, Bill! What's up?

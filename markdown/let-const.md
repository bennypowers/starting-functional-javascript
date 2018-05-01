```js
let theHair = 'shilky shmooth';           // let's value can change,
const theZohan = 'I Sculpt the Hair';     // const's cannot.

theHair = "It's pleasant";                // "It's pleasant"
theZohan = "I Don't Cut the Hair";        // TypeError: Assignment to constant variable.
```

## Careful: References `!==` Values!
```js
const fizzyBubblech = { flavor: 'grape' }

fizzyBubblech.flavor = 'apple';           // works because the reference
                                          // to fizzyBubblech is constant.
```

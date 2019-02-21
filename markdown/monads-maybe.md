```js
const safeNumber = x =>
  typeof x === 'number' ? Maybe.of(x) : Nothing()

// NOTE: IRL, there are better ways to write this. e.g. applicatives
const safeAdd = (x, y) =>
  safeNumber(y)
    .chain(i =>
      safeNumber(x)
        .map(add(i)))

safeAdd(1, 2)    // Maybe 3

safeAdd(1, null) // Nothing

safeAdd('רק', 'ביבי') // Nothing
```

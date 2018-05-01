const ternary = (a, ...rest) =>     // rest / gather
  console.log(a, ...rest)           // spread

const nAry = (...args) => {
  const [, snd, ...rest] = args     // gather
  console.log(
    'snd: ', snd,
    'rest: ', rest
  )
}

ternary(1, 2, 3, 4)                 // 1 2 3 4
nAry(1, 2, 3, 4, 5)                 // snd: 2 rest: [3, 4, 5]

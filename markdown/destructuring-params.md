## Destructuring an Array Param
```js
const head = ( [a] ) => a

head([1, 2, 3]) // 1
```


## Destructuring an Object Param
```js
const displayUser = ( { userName, picture } ) => {
  document.getElementById('user-name').innerHTML = userName;
  document.getElementById('picture').src = picture;
}

displayUser({
  userName: 'Zoya',
  picture: '//blink.gg/team/zoya.jpg',
})
```  

☝️ passing an `options` or `params` object to a unary function is a *very* common pattern in JS, and pairs well with succinct object form.

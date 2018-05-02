```js
function User(name, picture, followers) {
  this.name = name
  this.picture = picture
  this.followers = followers
}

User.prototype.notifyFollowers = function() {
  this.followers.map(notify)
}

User.prototype.downloadPicture = function() {
  fetch(this.picture)
    .then(handleAsBlob)
    .then(generateDownload)
}
```

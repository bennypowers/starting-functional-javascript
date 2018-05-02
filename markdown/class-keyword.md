```js
class User {

  constructor(name, picture, followers) {
    this.name = name
    this.picture = picture
    this.followers = followers
  }

  notifyFollowers() {
    this.followers.map(notify)
  }

  downloadPicture() {
    fetch(this.picture)
      .then(handleAsBlob)
      .then(generateDownload)
  }

}
```

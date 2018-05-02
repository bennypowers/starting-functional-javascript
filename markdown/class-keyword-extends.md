```js
class Admin extends User {

  constructor(token) {
    super()
    this.token = token
  }

  deleteUserFollowers(user) {
    user.followers = []
  }

  addFlair(flair) {
    fetch(this.picture)
      .then(handleAsBlob)
      .then(overlay(flair))
      .then(uploadToPictureHost)
      .then(response => this.picture = response.urlToPicture)
  }

}
```

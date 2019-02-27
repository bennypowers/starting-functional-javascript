```js
import propPathOr from 'crocks/helpers/propPathOr'
const getFirstCourseId =
  propPathOr(null, ['courses', '0', 'id'])

getFirstCourseId({ courses: [{ id: 1 }] })  // 1
getFirstCourseId({ courses: 'blammo!' })    // null
```

## Old-School Solution: Manual Checking
```js
function setDeptHead(setter, options) {
  if (options === undefined) options = { dept: 'analytics' };
  return setter( options.dept === 'analytics' ? 'Reut' : 'Moshe' );
}
```

## A New Option: Default Params
```js
// options defaults to { dept: 'analytics' }
const setDeptHead = ( setter, options = { dept: 'analytics' } ) =>
  setter( options.dept === 'analytics' ? 'Reut' : 'Moshe' )

setDeptHead(console.log)            // Reut
setDeptHead(console.log, {})        // Moshe

setDeptHead(console.log, null)      // ✋ Careful! null won't be substituted, only undefined.
                            // TypeError: Cannot read property 'dept' of null

setDeptHead(console.log, undefined) // Reut
```

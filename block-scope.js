// Old School IIFEs

(function PrivateScope() {
  var priv = true;
  console.log(priv ? '😎' : '😢') // 😎
}());

console.log(priv) // ReferenceError: priv is not defined

// New Hotness Blockscope

if (partyTime) {
  const awesome = true;
  console.log(awesome ? '😎' : '😢') // 😎
}

console.log(awesome) // Uncaught ReferenceError: awesome is not defined

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "github-logo.svg",
    "revision": "ff66eb8ec531024561b1c1ddab593e2f"
  },
  {
    "url": "gitlab-logo.svg",
    "revision": "350077b9246d6bcfcdb9013f7e8db87e"
  },
  {
    "url": "index.html",
    "revision": "e3396002c1eb25c2b0dd97b2aebd3957"
  },
  {
    "url": "js.jpg",
    "revision": "02287d1701e3bcce8010bd5a061e96da"
  },
  {
    "url": "manifest.json",
    "revision": "a2d87ddea3a4f0748467d49eea71c3b4"
  },
  {
    "url": "markdown/arrow-functions-1.md",
    "revision": "ccb35675401938380f2bacb936c6206d"
  },
  {
    "url": "markdown/arrow-functions-2.md",
    "revision": "a51e4408252040443f29ff8f2e8d147d"
  },
  {
    "url": "markdown/arrow-functions-this.md",
    "revision": "1a4cbb170bba1a6bbb836f1e04f6bc46"
  },
  {
    "url": "markdown/async-functions.md",
    "revision": "b5ff9e1da4fed65ea30a599404876bc4"
  },
  {
    "url": "markdown/block-scope.md",
    "revision": "8e13959086e63b822950342a1fa3e3fa"
  },
  {
    "url": "markdown/class-keyword-es5.md",
    "revision": "a5d0991251aabc5b49944de9939e2871"
  },
  {
    "url": "markdown/class-keyword-extends.md",
    "revision": "b6d5be4bf43a2dec095beaa80b1edab0"
  },
  {
    "url": "markdown/class-keyword.md",
    "revision": "ca05bb84f38cfd65669112d143a87166"
  },
  {
    "url": "markdown/computed-object-keys-es5.md",
    "revision": "6448a756398f1abe50f66eb485f7e66f"
  },
  {
    "url": "markdown/computed-object-keys.md",
    "revision": "26b648d945f9e5716dc6a91830bc89a0"
  },
  {
    "url": "markdown/concise-object-params.md",
    "revision": "cb679ab2dec59dd6f1e8b02af56c8967"
  },
  {
    "url": "markdown/concise-object.md",
    "revision": "55fc7f35106944d6c96245b95b504a73"
  },
  {
    "url": "markdown/default-parameters-problem.md",
    "revision": "ff2653eada406fe8440eec4c30307568"
  },
  {
    "url": "markdown/default-parameters.md",
    "revision": "eb645c2d6e44445fa2316883fab243aa"
  },
  {
    "url": "markdown/destructuring-alias.md",
    "revision": "b1c0c1350dd44f8070bda9aa933f4ada"
  },
  {
    "url": "markdown/destructuring-array.md",
    "revision": "62001832c828cbbe683a48ee662358f2"
  },
  {
    "url": "markdown/destructuring-object.md",
    "revision": "7c03a0b745281798465a0653da34b14f"
  },
  {
    "url": "markdown/destructuring-params.md",
    "revision": "c4050ce35fbd9e1643560626f86a0452"
  },
  {
    "url": "markdown/let-const.md",
    "revision": "294919c85a629c0f8489c2392f4dcb88"
  },
  {
    "url": "markdown/promises.md",
    "revision": "0e1ee92a12ef47bbd391d35e50c6f347"
  },
  {
    "url": "markdown/rest-spread-tricks.md",
    "revision": "cdfefaf8b7a9624c613ebede847d6c6b"
  },
  {
    "url": "markdown/rest-spread.md",
    "revision": "47cb687a09d44f368a5809f4726f6e90"
  },
  {
    "url": "markdown/template-literals-es5.md",
    "revision": "a73893faf7bd97e6e5bff233bebed625"
  },
  {
    "url": "markdown/template-literals.md",
    "revision": "40e3e12b9866a36dd13edfe8782958fe"
  },
  {
    "url": "package-lock.json",
    "revision": "528ffc4ec5e31416f308a239376b76ca"
  },
  {
    "url": "package.json",
    "revision": "ce14690ff409f1c0ef93c0ad7d155691"
  },
  {
    "url": "prism-atom-dark.css",
    "revision": "9478e865e227dccebc547e88048032ad"
  },
  {
    "url": "rollup.config.js",
    "revision": "475f8269facd4b8decc28db8356389ef"
  },
  {
    "url": "screenshot.png",
    "revision": "002b8edddd4568d7def375a267626fb7"
  },
  {
    "url": "slide-elements.js",
    "revision": "75d2500139d054d79fe383b6ac90540e"
  },
  {
    "url": "slide-elements.nomodule.js",
    "revision": "ca1693882fff9cae7d8ce416997d3b89"
  },
  {
    "url": "workbox-config.js",
    "revision": "c031dc3a4a9289b7ab9d6efd3bd251e7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

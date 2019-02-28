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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "images/crocks.png",
    "revision": "556df83d5e6c84521e0bf12b4f93d145"
  },
  {
    "url": "images/curry.jpg",
    "revision": "e8f45e5e51cbefb0ad37877aa9c16c83"
  },
  {
    "url": "images/github-logo.svg",
    "revision": "ff66eb8ec531024561b1c1ddab593e2f"
  },
  {
    "url": "images/gitlab-logo.svg",
    "revision": "350077b9246d6bcfcdb9013f7e8db87e"
  },
  {
    "url": "images/js.192x192.png",
    "revision": "c78666daeb55169ae48b62c1e4157ef1"
  },
  {
    "url": "images/js.48x48.png",
    "revision": "ecf3e04c840524e0d40a9e984654e2d0"
  },
  {
    "url": "images/js.512x512.png",
    "revision": "d839e4efe240c30a7b793322ff70eb5a"
  },
  {
    "url": "images/js.96x96.png",
    "revision": "121af327054a5b4745a04d066ba7add4"
  },
  {
    "url": "images/poster.png",
    "revision": "c343be2d6e1636d51972f815dde3ab25"
  },
  {
    "url": "images/red-heifer.jpg",
    "revision": "96b5f7b633f50a33827d04637c7d449e"
  },
  {
    "url": "index.html",
    "revision": "c41d0cf4e75bbc6e4e4a9d2eb63bf8a7"
  },
  {
    "url": "main.js",
    "revision": "10f26ddd2a34ba23227b78df15a42235"
  },
  {
    "url": "markdown/class-mixins-1.md",
    "revision": "28c3636e931e0823cf6b4180acb501a8"
  },
  {
    "url": "markdown/class-mixins-2.md",
    "revision": "087db2dc038acdd023a8a68f0e26e193"
  },
  {
    "url": "markdown/compose-binary.md",
    "revision": "b6b1e4f661d7bf44487a8f0d9f0bc1c6"
  },
  {
    "url": "markdown/compose-examples.md",
    "revision": "6934efb50318778382e1758c1e97e4b0"
  },
  {
    "url": "markdown/crocks-curry.md",
    "revision": "60efa1e105dcdde085296328869616a8"
  },
  {
    "url": "markdown/crocks-logic.md",
    "revision": "ce64fc495444af1733ea2dbf0bef0576"
  },
  {
    "url": "markdown/crocks-propOr-1.md",
    "revision": "f5bd9ca5a3112081e8a0469e45cda1eb"
  },
  {
    "url": "markdown/crocks-propOr-2.md",
    "revision": "c827f421f8720d7eeac8dd2a71fec054"
  },
  {
    "url": "markdown/crocks-propPathOr.md",
    "revision": "e99d626f87c9a9278a2ffba21942a8d7"
  },
  {
    "url": "markdown/curried-functions-2.md",
    "revision": "cdef8bd2cb6fc5c6426dc196783d70eb"
  },
  {
    "url": "markdown/curried-functions.md",
    "revision": "35d6c1c40c3cee280ea98d321589b0a1"
  },
  {
    "url": "markdown/functors.md",
    "revision": "637a74d23d6d484b00b06d0a59b7f470"
  },
  {
    "url": "markdown/monads-array.md",
    "revision": "c847591a3aebb7b97f0420b755ed309f"
  },
  {
    "url": "markdown/monads-maybe-applicative.md",
    "revision": "80fb8d53a46aa9d93ea40b6f5abb08f7"
  },
  {
    "url": "markdown/monads-maybe-chain.md",
    "revision": "9ae6d36e08be2799ed4bbcc08b53f81d"
  },
  {
    "url": "markdown/monads-maybe.md",
    "revision": "12551f1e46fb68e57b3e0a7abc303f3e"
  },
  {
    "url": "markdown/mreduceMap.md",
    "revision": "16f4201f9be7145f5bb4335be878e2ad"
  },
  {
    "url": "markdown/partial-application-1.md",
    "revision": "a21120957ef4607e8d3e5a7b58e1b907"
  },
  {
    "url": "markdown/partial-application-2.md",
    "revision": "26077264b26fcf9899677962c819ae5d"
  },
  {
    "url": "markdown/pointfree-1.md",
    "revision": "ae3f038645d53b3b5fa0cd4f1a1fd685"
  },
  {
    "url": "markdown/pointfree-2.md",
    "revision": "8b7ff0af690b280ae895f53f08c6072a"
  },
  {
    "url": "markdown/pure-functions-1.md",
    "revision": "272791d8cbca22403c56ac9f936fa4ad"
  },
  {
    "url": "markdown/pure-functions-2.md",
    "revision": "9d4234abd86c8ed7cf08d5cebdcfa5f4"
  },
  {
    "url": "markdown/pure-functions-3.md",
    "revision": "350b4c8033c802fbc587de6f4bde2149"
  },
  {
    "url": "markdown/pure-functions-4.md",
    "revision": "1616559fb7a624e1702036e97ddb5069"
  },
  {
    "url": "markdown/pure-functions-5.md",
    "revision": "b95bcf33dd1dd1bb722817a9044c2556"
  },
  {
    "url": "package-lock.json",
    "revision": "1da25165801d39607e45e5ed0a775735"
  },
  {
    "url": "package.json",
    "revision": "919e73282f2f83b0c8347332e049bc37"
  },
  {
    "url": "prism-atom-dark.css",
    "revision": "9478e865e227dccebc547e88048032ad"
  },
  {
    "url": "README.md",
    "revision": "ebb5223ffd19e83d142ae520b927531b"
  },
  {
    "url": "rollup.config.js",
    "revision": "67f542f54c5be90a9c19036fe88db9bb"
  },
  {
    "url": "slide-elements.local.js",
    "revision": "4012ff83c4ecb581355f699c81557947"
  },
  {
    "url": "slide-elements.nomodule.js",
    "revision": "d9b2f0f39f19276f7baf277bfb572cf3"
  },
  {
    "url": "workbox-config.js",
    "revision": "317ad1ab998eeea5596d30b8e714cf92"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

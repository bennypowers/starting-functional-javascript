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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
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
    "revision": "77da0859599d52265240a606d2615d0e"
  },
  {
    "url": "index.html",
    "revision": "bb4ac7f55fe8bae7aa0b1703781ae15b"
  },
  {
    "url": "main.js",
    "revision": "ad22f877ae58ae354943c5d06833ac9e"
  },
  {
    "url": "main.nomodule.js",
    "revision": "f9adfa4e91b3bb389bb016ce7ff4ee5b"
  },
  {
    "url": "markdown/arrow-functions-1.md",
    "revision": "22399b6ca272ab0d1cc898592b617beb"
  },
  {
    "url": "markdown/arrow-functions-2.md",
    "revision": "8813804b2df66c5c1f5168b03deeb47f"
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
    "revision": "2a8f50576621dd20d487c092b43381df"
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
    "revision": "6bcb1e6658381d2ae4bf30dc4c5279b1"
  },
  {
    "url": "markdown/computed-object-keys.md",
    "revision": "01ac556b08aba8cfeaae5196386d6654"
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
    "revision": "0562bb4866ca3d78cb9f46268cd14962"
  },
  {
    "url": "markdown/default-parameters.md",
    "revision": "25b812e83de25355f93d6775064b7e3d"
  },
  {
    "url": "markdown/destructuring-alias.md",
    "revision": "be3c3b66bfe73db41828c224238271de"
  },
  {
    "url": "markdown/destructuring-array.md",
    "revision": "62001832c828cbbe683a48ee662358f2"
  },
  {
    "url": "markdown/destructuring-object.md",
    "revision": "81d677c567a9a2e0fd42c9a29d295482"
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
    "revision": "777b4c8027d9a0a54fd6a1e9738d4e20"
  },
  {
    "url": "markdown/rest-spread-tricks.md",
    "revision": "2ab303192b46bce843ea5af7c32f0fb4"
  },
  {
    "url": "markdown/rest-spread.md",
    "revision": "19cb21c46fe0e4a7b072275e153d9edb"
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
    "revision": "a0225b30100b56f1f68025b46ea741d0"
  },
  {
    "url": "package.json",
    "revision": "7a15a8a30388004ec2536cb536dfe930"
  },
  {
    "url": "prism-atom-dark.css",
    "revision": "9478e865e227dccebc547e88048032ad"
  },
  {
    "url": "README.md",
    "revision": "4e00eb182b162d30108c8352c007a89b"
  },
  {
    "url": "rollup.config.js",
    "revision": "fe957635ece73326f7be8cf2f12265c9"
  },
  {
    "url": "slide-elements.local.js",
    "revision": "c89d51250355776a9ab4b4370aebdb84"
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

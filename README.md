# babel-plugin-transform-system-import-commonjs

[Babel](https://babeljs.io/) plugin that transforms ES2015 System.import into CommonJS require.

## Deprecation notice

**Since [import() proposal](https://github.com/tc39/proposal-dynamic-import) was accepted, `System.import` function now is obsolete and this plugin is not recommended to use in new projects. Please use  `import()` function with [babel-plugin-transform-import-commonjs](https://www.npmjs.com/package/babel-plugin-transform-import-commonjs) instead.**


## How this works

This plugin transforms
```js
var myModule = "./path/to/myModule";

System.import(myModule).then(function (module) {
  console.log(module);
});
```
to
```js
var myModule = "./path/to/myModule";

new Promise(function(resolve) {
  resolve(require(myModule));
}.bind(this)).then(function (module) {
  console.log(module);
});
```

## Requirements

You need support for Promise, use polyfill if needed.

## Installation

```sh
$ npm install babel-plugin-transform-system-import-commonjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-system-import-commonjs"]
}
```

### Via CLI

```sh
$ babel --plugins transform-system-import-commonjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-system-import-commonjs"]
});
```

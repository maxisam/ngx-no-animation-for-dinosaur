[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![travis build](https://img.shields.io/travis/maxisam/ngx-no-animation-for-dinosaur.svg?style=flat-square)](https://travis-ci.org/maxisam/ngx-no-animation-for-dinosaur)
[![npm](https://img.shields.io/npm/dt/ngx-no-animation-for-dinosaur.svg?style=flat-square)](https://www.npmjs.com/package/ngx-no-animation-for-dinosaur)
[![GitHub release](https://img.shields.io/github/release/maxisam/ngx-no-animation-for-dinosaur.svg?style=flat-square)](https://github.com/maxisam/ngx-no-animation-for-dinosaur/releases)
[![npm](https://img.shields.io/npm/l/ngx-no-animation-for-dinosaur.svg?style=flat-square)]()

# ngx-no-animation-for-dinosaur

This library utilize Angular private API to disable animation. There is a chance that Angular might change it. If you have any doubt, please run test (`karma start`) to make sure it works as it should be. (An easy way is trying to set disable as true, and see if it works. You can put this in your unit test as well.)
 
## Dependencies

+ Angular >=4.0.0

## Install

You can get it on npm.

```
npm install ngx-no-animation-for-dinosaur --save
```

## Build project

```
1. npm i

2. npm run build
```

### Purpose ?

Enable Animation for only [supported browser](https://github.com/web-animations/web-animations-js/blob/dev/docs/support.md#browser-support) with polyfill

* Chrome
* Firefox 27+
* IE10+ (including Edge)
* Safari (iOS) 7.1+
* Safari (Mac) 9+

### How to use:

in ngModule:
```
import { BrowserSupportedAnimationsModule } from 'ngx-no-animation-for-dinosaur';

```

```
 imports: [BrowserSupportedAnimationsModule.forRoot({disable: boolean})],
```


### Demo

try demo under demo/cliDemo

[plunker](http://plnkr.co/edit/2RxkVjy1K3FgSxKycsEU?p=preview)

### Acknowledgement

Kudos to

+ This project is inspired by user2957238@StackOverflow answer

+ The build process is based on [angular-library-starter](https://github.com/robisim74/angular-library-starter) by @robisim74

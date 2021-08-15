[![Build Status](https://img.shields.io/github/workflow/status/danpercic86/helpful-decorators/Publish%20Package/master)](https://github.com/danpercic86/helpful-decorators)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

# Helpful Decorators For Typescript Projects
forked from https://github.com/NetanelBasal/helpful-decorators

## Installation
```
npm install @danpercic86/helpful-decorators
yarn add @danpercic86/helpful-decorators
```

## Usage
`Delay` - Add `setTimeout` functionality to the method

```js
import { Delay } from '@danpercic86/helpful-decorators';

class Test {
 @Delay(1000)
 method() {
   // ...
 }
}
```

`Debounce` - Add `debounce` functionality to the method ([options](https://lodash.com/docs/4.17.4#debounce))

```js
import { Debounce } from '@danpercic86/helpful-decorators';

class Test {
 @Debounce(1000, options)
 method() {
   // ...
 }
}
```

`Throttle` - Add `throttle` functionality to the method ([options](https://lodash.com/docs/4.17.4#throttle))
```js
import { Throttle } from '@danpercic86/helpful-decorators';

class Test {
 @Throttle(1000, options)
 method() {
   // ...
 }
}
```

`Once` - Add `once` functionality to the method
```js
import { Once } from '@danpercic86/helpful-decorators';

class Test {
 @Once()
 method() {
   // This will run only once
 }
}
```

`Measure` - measure time taken by a function to execute

```js
import { Measure } from '@danpercic86/helpful-decorators';

class Test {
 @Measure()
 doSomething() {
   // Call to doSomething took 0.35 milliseconds.
 }

 @Measure()
 async doSomethingHello(){
    // Call to doSomethingHello took 0.35 milliseconds.
 }
}
```


`Mixin` - this pattern is used to achieve multiple inheritance
```js
import { Mixin } from '@danpercic86/helpful-decorators';

@Mixin([Disposable, Activatable])
class Test {
}
```

`Memo` - memoizes the result of the function
```js
import { Memo } from '@danpercic86/helpful-decorators';

class Test {

  @Memo()
  method() {
    // ...memoized
  }
}
```

`Bind` - automatically bind methods to class instances
```js
import { Bind } from '@danpercic86/helpful-decorators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    document.body.addEventListener('click', this.onClick);
  }

  @Bind()
  onClick($event) {
    console.log($event);
  }
}
```

`Required` - useful for angular's @Input(); throws error if input is not assigned
```js
import { Required } from '@danpercic86/helpful-decorators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Input() @Required() someValue!: string;
}
```

`SortBy` - sort an array by a specific property in individual elements or non-object items (By default, it sorts by `type === 'string'` and `isDescending === true`)
```js
import { SortBy } from '@danpercic86/helpful-decorators';

class Test {

  @SortBy('name', {
    isDescending: false,
  })
  names = [ { name: 'b' }, { name: 'a' }, { name: 'c' } ];

  @SortBy('', {
    isDescending: true,
    type: 'date'
  })
  dates = [ '2020-06-17', '2020-06-16', '2020-06-20', '2020-06-10' ];

  @SortBy('', {
    isDescending: false,
  })
  numbers = [ 6, 3, 4, 1 ];
}
```

License
----

MIT

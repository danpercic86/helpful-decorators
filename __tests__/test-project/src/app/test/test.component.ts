import { Component } from '@angular/core';
import {Debounce, Measure, Throttle} from "@danpercic86/helpful-decorators";

@Component({
  selector: 'app-test',
  template: '<span>Test component</span>'
})
export class TestComponent {

  @Debounce(2000)
  debouncedMethod(): void {
    console.log("its debounced");
  }

  @Throttle(1000)
  throttledMethod(): void {
    console.log("it's throttled")
  }

  @Measure()
  measuredMethod(): void {
    for (let i = 0; i < 10000; i += 1) {
      console.log(i)
    }
  }
}

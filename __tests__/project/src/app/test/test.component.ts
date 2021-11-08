import {Component, Input} from '@angular/core';
import {Debounce, Measure, Throttle} from "@danpercic86/helpful-decorators";
import {OnChange} from "../../../../../src/on-change";

@Component({
  selector: 'app-test',
  template: '<span>Test component</span>'
})
export class TestComponent {
  @Input()
  @OnChange<string, TestComponent>('onChangeTest')
  propertyX!: string

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

  onChangeTest() {
    console.log('On change works!')
  }
}

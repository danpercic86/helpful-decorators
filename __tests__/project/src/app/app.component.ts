import {Component, OnInit, ViewChild} from '@angular/core';
import {TestComponent} from "./test/test.component";

@Component({
  selector: 'app-root',
  template: '<app-test></app-test>'
})
export class AppComponent implements OnInit {
  @ViewChild(TestComponent) private readonly testComponent!: TestComponent;

  ngOnInit(): void {
    setTimeout(() => {
      this.testComponent.debouncedMethod();
      this.testComponent.debouncedMethod();
      this.testComponent.debouncedMethod();
      this.testComponent.throttledMethod();
      this.testComponent.throttledMethod();
      this.testComponent.debouncedMethod();
      this.testComponent.measuredMethod();
    })
  }
}

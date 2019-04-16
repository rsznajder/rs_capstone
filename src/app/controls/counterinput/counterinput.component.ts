import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

/* rubric53 */
@Component({
  selector: 'app-counterinput',
  templateUrl: './counterinput.component.html',
  styleUrls: ['./counterinput.component.css']
})
export class CounterInputComponent {
  @Input() counter: number = 1;
  @Output() private counterChange = new EventEmitter<number>();

  constructor() { }

  increment() {
    if (!this.counter) {
      this.counter = 1;
      return;
    }
    this.counter = this.counter + 1;
    this.counterChange.emit(this.counter);
  }

  decrement() {
    if (!this.counter) {
      this.counter = 1;
      return;
    }
    if (this.counter >= 2) {
      this.counter = this.counter - 1;
    } else {
      this.counter = 1;
    }
    this.counterChange.emit(this.counter);
  }

  /* rubric53, rubric55 */
  onValueChange(event: any) {
    console.log(event);
    console.log(typeof event);
    if (!event || event === '' || typeof event !== 'string') {
      this.counter = null;
    } else {
      const newCounter = Number(event);
      if (newCounter === this.counter) {
        return;
      }
      this.counter = newCounter;
    }
    this.counterChange.emit(this.counter);
  }
}

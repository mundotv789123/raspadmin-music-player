import { Component, ElementRef, Input, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-range',
  imports: [],
  templateUrl: './range.html'
})
export class Range {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  percentValue = 0;

  @Input()
  set percent(value: number) {
    this.percentValue = value;
  }

  customClass = input<string>()

  change = output<Event>()

  handlerChange(event: Event) {
    this.percentValue = Number(this.inputRef.nativeElement.value ?? '0');
    this.change.emit(event);
  }
}

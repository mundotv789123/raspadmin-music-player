import { Component, ElementRef, Input, input, OnInit, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-range',
  imports: [],
  templateUrl: './range.html',
  styleUrl: './range.css'
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
  mousemove = output<Event>()
  mouseenter = output<Event>()
  mouseleave = output<Event>()

  handlerChange(event: Event) {
    this.percentValue = Number(this.inputRef.nativeElement.value ?? '0');
    this.change.emit(event);
  }

  handlerMouseMove = this.mousemove.emit
  handlerMouseEnter = this.mouseenter.emit
  handlerMouseLeave  = this.mouseleave.emit
}

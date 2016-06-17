import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'input-debounce',
  	templateUrl: 'input-debounce.component.html'
})
export class InputDebounceComponent implements OnInit {
    @Input() placeholder: string;
	@Input() delay: number = 300;
    @Output() value = new EventEmitter();
	public inputValue: string;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit () {
        const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
    }
}
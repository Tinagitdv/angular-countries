import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

    private debouncer: Subject<string> = new Subject<string>;
    private debouncerSuscription?: Subscription;

    /*@ViewChild('txtInput')
    private txtInput!: ElementRef<HTMLInputElement>;*/

    @Input()
    public placeholder: string = '';

    @Input()
    public initialValue: string = '';

    @Output()
    public onValue: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    public onDebounce = new EventEmitter<string>();

    ngOnInit(): void {
      this.debouncerSuscription = this.debouncer
        .pipe(
          debounceTime(300)
        )
        .subscribe(value => {
          this.onDebounce.emit(value);
        });
    }

    ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
    }

    public searchValue(value:string):void {
      //this.onValue.emit(this.txtInput.nativeElement.value);
      this.onValue.emit(value);
    }

    onKeyPress(searchTerm: string) {
      this.debouncer.next(searchTerm);
    }
}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

    /*@ViewChild('txtInput')
    private txtInput!: ElementRef<HTMLInputElement>;*/

    @Input()
    public placeholder: string = '';

    @Output()
    public onValue: EventEmitter<string> = new EventEmitter<string>();

    public searchValue(value:string):void {
      //this.onValue.emit(this.txtInput.nativeElement.value);
      this.onValue.emit(value);
    }
}

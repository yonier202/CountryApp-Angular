import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject <string>();

  // (?, por que al inicializar no hay una subscripcion)
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue= new EventEmitter<string>();

  @Output()
  public onDebounce= new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    //debounce(observable)
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    //limpiar suscripcion
    this.debouncerSuscription?.unsubscribe();
  }



  public emitValue(value:string):void {
    this.onValue.emit(value);
  }
  public onKeyPress(serchTerming: string){
    this.debouncer.next(serchTerming);
  }

}

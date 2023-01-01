import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversionRecord, StateType } from 'src/models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BehaviorSubject<StateType>{

  addConversion(date: string, value: ConversionRecord) {

    const state = this.state;
    if(state && state.conversions){
      //check if date already exists
      const index = state.conversions.findIndex((conversion) => conversion.date === date);
      if(index > -1){
        state.conversions[index].conversions.unshift(value);
        this.state = state;
      }else{
        state.conversions.unshift({date, conversions: [value]});
        this.state = state;
      }
    }else{
      this.state = {conversions: [{date, conversions: [value]}]};
    }
  }

  constructor() {
    super(null);
  }

  public get state(): StateType {
    return this.getValue();
  }

  public set state(state: StateType) {
    this.next(state);
  }

  public init(): void {
    // init state from local storage
    const state = localStorage.getItem('state');
    if (state) {
      this.state = JSON.parse(state);
    }

    // subscribe to state changes and save to local storage
    this.subscribe((state) => {
      localStorage.setItem('state', JSON.stringify(state));
    });
  }

}

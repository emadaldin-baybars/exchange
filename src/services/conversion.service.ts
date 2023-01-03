import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversion } from 'src/models/conversion';
import { ConversionHttpService } from './http/conversion-http.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  conversionParams: BehaviorSubject<{from: string; to: string; amount: number; date: string}> = new BehaviorSubject({from: '', to: '', amount: 0, date: ''});
  showHistory: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpConvert: ConversionHttpService, private state: StateService) { }

  convert(from: string, to: string, amount: number, date: string): Observable<Conversion> {
    // const from = this.conversionParams.getValue().from;
    // const to = this.conversionParams.getValue().to;
    // const amount = this.conversionParams.getValue().amount;
    // const date = this.conversionParams.getValue().date;

    return this.httpConvert.getConversion(from, to, amount, date);
  }

  getExchangeRateHistory(from: string, to: string): Observable<any> {
    const latest = this.state.getValue()?.conversions.pop()?.conversions.pop();

    return this.httpConvert.getExchangeRateHistory(from, to, latest?.from|| '', latest?.to|| '');
  }

}

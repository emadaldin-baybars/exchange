import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversion } from 'src/models/conversion';
import { ConversionHttpService } from './http/conversion-http.service';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  conversionParams: BehaviorSubject<{from: string; to: string; amount: number}> = new BehaviorSubject({from: '', to: '', amount: 0});

  constructor(private httpConvert: ConversionHttpService) { }

  convert(): Observable<Conversion> {
    const from = this.conversionParams.getValue().from;
    const to = this.conversionParams.getValue().to;
    const amount = this.conversionParams.getValue().amount;

    return this.httpConvert.getConversion(from, to, amount);
  }

  getExchangeRateHistory(from: string, to: string): Observable<any> {
    const base = this.conversionParams.getValue().from;
    const symbol = this.conversionParams.getValue().to;
    return this.httpConvert.getExchangeRateHistory(from, to, base, symbol);
  }

}

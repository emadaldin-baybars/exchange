import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversion } from 'src/models/conversion';

@Injectable({
  providedIn: 'root'
})
export class ConversionHttpService {

  constructor(private http: HttpClient) { }

  getConversion(from: string, to: string, amount: number, date: string): Observable<Conversion> {
    return this.http.get<Conversion>(`https://api.exchangerate.host/convert?from=${from}&to=${to}&date="${date}"&amount=${amount}`);
  }

  getExchangeRateHistory(from: string, to: string, base: string, symbol:string): Observable<any> {
    return this.http.get<any>(`https://api.exchangerate.host/timeseries?start_date=${from}&end_date=${to}&base=${base}&symbols=${symbol}`);
  }
}

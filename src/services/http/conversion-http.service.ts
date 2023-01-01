import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversion } from 'src/models/conversion';

@Injectable({
  providedIn: 'root'
})
export class ConversionHttpService {

  constructor(private http: HttpClient) { }

  getConversion(from: string, to: string, amount: number): Observable<Conversion> {
    return this.http.get<Conversion>(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
  }

  getExchangeRateHistory(from: string, to: string, base: string, symbol:string): Observable<any> {
    // https://api.exchangerate.host/timeseries?start_date=2022-12-25&end_date=2023-01-01&base=USD&symbols=EGP
    return this.http.get<any>(`https://api.exchangerate.host/timeseries?start_date=${from}&end_date=${to}&base=${base}&symbols=${symbol}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { ConversionService } from 'src/services/conversion.service';

@Component({
  selector: 'app-currency-converter',
  template: `
    <div class="container">
      <div>
        <app-conversion-form></app-conversion-form>
      </div>
      <!-- divider to be added -->
      <div *ngIf="conversionService.showHistory|async">
        <app-exchange-history></app-exchange-history>
      </div>
    </div>

  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      flex:1;
      margin: 50px;
      padding-bottom: 50px;
    }

  `]
})
export class CurrencyConverterComponent implements OnInit {

  constructor(public conversionService: ConversionService) { }

  ngOnInit(): void {

  }

}

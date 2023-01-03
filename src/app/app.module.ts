import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from 'src/components/footer/footer.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { MaterialModule } from 'src/material/material.module';
import { ConversionHistoryComponent } from 'src/pages/conversion-history/conversion-history.component';
import { CurrencyConverterComponent } from 'src/pages/currency-converter/currency-converter.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversionFormComponent } from 'src/components/conversion-form/conversion-form.component';
import { ConversionService } from 'src/services/conversion.service';
import { ConversionHttpService } from 'src/services/http/conversion-http.service';

import { HttpClientModule } from '@angular/common/http';
import { ExchangeHistoryComponent } from 'src/components/exchange-history/exchange-history.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SparklineChartComponent } from 'src/components/sparkline-chart/sparkline-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CurrencyConverterComponent,
    ConversionHistoryComponent,
    ConversionFormComponent,
    ExchangeHistoryComponent,
    SparklineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [
    ConversionService,
    ConversionHttpService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversionHistoryComponent } from 'src/pages/conversion-history/conversion-history.component';
import { CurrencyConverterComponent } from 'src/pages/currency-converter/currency-converter.component';

const routes: Routes = [
  { path: '', redirectTo: '/currency-converter', pathMatch: 'full' },
  { path: 'currency-converter', component: CurrencyConverterComponent },
  { path: 'conversion-history', component: ConversionHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

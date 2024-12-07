import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './client/components/currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from './client/components/currency-details/currency-details.component';
import { UsdDetailsComponent } from './client/components/usd-details/usd-details.component';
import { EurDetailsComponent } from './client/components/eur-details/eur-details.component';

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'details', component: CurrencyDetailsComponent },
  { path: 'usd-details', component: UsdDetailsComponent },
  { path: 'eur-details', component: EurDetailsComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

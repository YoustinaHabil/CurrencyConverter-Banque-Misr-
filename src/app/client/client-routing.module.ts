import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { UsdDetailsComponent } from './components/usd-details/usd-details.component';
import { EurDetailsComponent } from './components/eur-details/eur-details.component';

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'usd-details', component: UsdDetailsComponent },
  { path: 'eur-details', component: EurDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }



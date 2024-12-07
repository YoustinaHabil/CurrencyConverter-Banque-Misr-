import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { UsdDetailsComponent } from './components/usd-details/usd-details.component';
import { EurDetailsComponent } from './components/eur-details/eur-details.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    CurrencyConverterComponent,
    UsdDetailsComponent,
    EurDetailsComponent,
    CurrencyDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ClientRoutingModule
  ],
  exports: [
    HeaderComponent,
    CurrencyConverterComponent
  ]
})
export class ClientModule { }

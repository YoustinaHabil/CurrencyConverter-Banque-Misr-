import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import {
  Currency,
  ConversionResponse,
} from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  conversionResult: ConversionResponse | null = null;

  // New properties for quick conversions
  readonly quickAmounts = [10, 50, 100, 500, 1000, 5000];
  quickConversionsFrom: { amount: number; result: number }[] = [];
  quickConversionsTo: { amount: number; result: number }[] = [];
  currentRate: number = 0;

  @Input() disabledFrom: boolean = false;
  @Input() initialFrom: string = 'USD';
  @Input() initialTo: string = 'EUR';

  get isValidAmount(): boolean {
    return this.amount > 0;
  }

  constructor(
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fromCurrency = this.initialFrom;
    this.toCurrency = this.initialTo;
    this.fetchCurrencies();
  }

  private fetchCurrencies(): void {
    this.loading$.next(true);
    this.currencyService
      .getCurrencies()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (currencies) => {
          this.currencies = currencies;
          this.error$.next(null);
          this.updateQuickConversions(); // Add initial quick conversions
        },
        error: (error) => {
          this.error$.next('Failed to load currencies');
          console.error(error);
        },
      });
  }

  onAmountChange(value: string): void {
    this.amount = Number(value);
    this.conversionResult = null;
  }

  swapCurrencies(): void {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    if (this.isValidAmount) {
      this.convert();
    }
    this.updateQuickConversions();
  }

  convert(): void {
    if (!this.amount || !this.fromCurrency || !this.toCurrency) {
      this.error$.next('Please fill in all fields');
      return;
    }

    this.loading$.next(true);
    this.currencyService
      .convert(this.fromCurrency, this.toCurrency, this.amount)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (response: ConversionResponse) => {
          this.conversionResult = response;
          this.currentRate = response.info.rate;
          this.updateQuickConversions();
          this.error$.next(null);
        },
        error: (error: Error) => {
          this.error$.next('Failed to convert currency');
          console.error(error);
        },
      });
  }

  private updateQuickConversions(): void {
    // Calculate quick conversions from source currency to target currency
    this.quickConversionsFrom = this.quickAmounts.map((amount) => ({
      amount,
      result: amount * this.currentRate,
    }));

    // Calculate quick conversions from target currency to source currency
    this.quickConversionsTo = this.quickAmounts.map((amount) => ({
      amount,
      result: amount / this.currentRate,
    }));
  }

  goToDetails(): void {
    this.router.navigate(['/details'], {
      queryParams: {
        from: this.fromCurrency,
        to: this.toCurrency,
      },
    });
  }
}

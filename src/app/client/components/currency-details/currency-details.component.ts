import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { Currency, HistoricalData, PopularRatesResponse } from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {
  fromCurrency: string = '';
  toCurrency: string = '';
  currencies: Currency[] = [];
  rates: { [key: string]: number } = {};
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  historicalData = {
    yearly: [] as HistoricalData[],
    monthly: [] as HistoricalData[],
    daily: [] as HistoricalData[]
  };

  popularRates: { currency: string; rate: number; name: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fromCurrency = params['from'] || 'USD';
      this.toCurrency = params['to'] || 'EUR';
      this.loadData();
    });
  }

  loadData(): void {
    this.loading$.next(true);
    this.error$.next(null);
    
    Promise.all([
      this.fetchCurrencies(),
      this.fetchHistoricalData(),
      this.fetchPopularRates()
    ]).finally(() => this.loading$.next(false));
  }

  getCurrencyName(code: string): string {
    const currency = this.currencies.find(c => c.code === code);
    return currency ? currency.name : code;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private async fetchCurrencies(): Promise<void> {
    try {
      const currencies = await firstValueFrom(this.currencyService.getCurrencies());
      this.currencies = currencies;
    } catch (error) {
      this.error$.next('Failed to load currencies');
      console.error(error);
    }
  }

  private async fetchHistoricalData(): Promise<void> {
    try {
      const [yearlyData, monthlyData, dailyData] = await Promise.all([
        firstValueFrom(this.currencyService.getHistoricalRates(this.fromCurrency, this.toCurrency, 'yearly')),
        firstValueFrom(this.currencyService.getHistoricalRates(this.fromCurrency, this.toCurrency, 'monthly')),
        firstValueFrom(this.currencyService.getHistoricalRates(this.fromCurrency, this.toCurrency, 'daily'))
      ]);

      this.historicalData = {
        yearly: yearlyData,
        monthly: monthlyData,
        daily: dailyData
      };
    } catch (error) {
      this.error$.next('Failed to load historical data');
      console.error(error);
    }
  }

  private async fetchPopularRates(): Promise<void> {
    try {
      const response = await firstValueFrom(this.currencyService.getPopularRates(this.fromCurrency));
      this.rates = response.rates;
      
      this.popularRates = Object.entries(response.rates).map(([code, rate]) => ({
        currency: code,
        rate: Number(rate),
        name: this.getCurrencyName(code)
      }));
    } catch (error) {
      this.error$.next('Failed to load popular rates');
      console.error(error);
    }
  }
}
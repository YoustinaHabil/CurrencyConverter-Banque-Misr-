import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToCurrency(currency: string) {
    this.router.navigate(['/details'], {
      queryParams: {
        from: currency,
        to: currency === 'USD' ? 'EUR' : 'USD',
      },
    });
  }

  isActiveCurrency(currency: string): boolean {
    const currentUrl = this.router.url;
    return (
      currentUrl.includes(`from=${currency}`) ||
      (currentUrl.includes('details') && currentUrl.includes(currency))
    );
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-eur-details',
  template: `
    <div class="details-page">
      <h2>EUR Exchange Rates</h2>
      <!-- Add your EUR details content here -->
    </div>
  `,
  styles: [`
    .details-page {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class EurDetailsComponent {}
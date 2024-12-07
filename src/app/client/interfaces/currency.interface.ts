export interface Currency {
    code: string;
    name: string;
  }
  
  export interface ConversionResponse {
    success: boolean;
    query: {
      from: string;
      to: string;
      amount: number;
    };
    info: {
      rate: number;
      timestamp: number;
    };
    result: number;
  }

  export interface HistoricalData {
    date: string;
    rate: number;
  }

  export interface PopularRatesResponse {
    rates: { [key: string]: number };
  }
export interface Stock {
  name: string;
  tickerSymbol: string;
  currency: string;
  exchangeName: string;
  exchangeCode: string;
  instrumentType: string;
  unit: number;
  price: number;
  lastTradeDateTime: Date;
  isMarketOpen: boolean;
}

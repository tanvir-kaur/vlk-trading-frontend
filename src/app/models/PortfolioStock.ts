export interface PortfolioStock {
  name: string;
  tickerSymbol: string;
  currency: string;
  exchangeName: string;
  exchangeCode: string;
  instrumentType: string;
  status: string;
  unit: number;
  price: number;
  transactionDate: Date;
}

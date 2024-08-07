import { PortfolioStock } from './PortfolioStock';

export interface Portfolio {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  balance: number;
  investments: number;
  currency: string;
  accountNumber: number;
  commissionRate: number;
  stocks: PortfolioStock[];
}

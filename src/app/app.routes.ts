import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'portfolio' },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/components/login/login-page.component').then(
        (mod) => mod.LoginPageComponent
      ),
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./feature/components/portfolio/portfolio.component').then(
        (mod) => mod.PortfolioComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./feature/components/ticker-search/ticker-search.component').then(
        (mod) => mod.TickerSearchComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'stock/:name/buy',
    loadComponent: () =>
      import('./feature/components/stock-buy/stock-buy.component').then(
        (mod) => mod.StockBuyComponent
      ),
    canActivate: [authGuard],
  },
];

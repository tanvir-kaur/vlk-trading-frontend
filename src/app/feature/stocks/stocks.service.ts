import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Stock } from '../../models/Stock';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${environment.apiUrl}/stocks`);
  }

  getStockDetails(tickerSymbol: string): Observable<Stock> {
    return this.http.get<Stock>(environment.apiUrl + '/stocks/' + tickerSymbol);
  }

  buyStock(buyingStockUnit: number, tickerSymbol: string): Observable<any> {
    let body = {
      buyingStockUnit: buyingStockUnit,
      tickerSymbol: tickerSymbol,
    };
    return this.http.put(environment.apiUrl + '/stocks', body);
  }
}

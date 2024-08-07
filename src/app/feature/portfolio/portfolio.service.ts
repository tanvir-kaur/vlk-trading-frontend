import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Portfolio } from '../../models/Portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getUserPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${environment.apiUrl}/portfolio`);
  }
}

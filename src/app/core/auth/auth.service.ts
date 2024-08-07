import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../../models/LoginRequest';
import { LoginResponse } from '../../models/LoginResponse';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly storageService = inject(StorageService);

  private loggedIn = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    let isAuthenticated =
      !this.jwtHelper.isTokenExpired() && this.storageService.isLoggedIn();
    this.loggedIn.next(isAuthenticated);
    return isAuthenticated;
  }

  login(body: Login): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/account/login`, body)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Handle invalid credentials or unauthenticated request
            console.log('Invalid credentials');
            this.router.navigate(['/login']);
          }
          return of();
        }),
        tap((response) => {
          this.storageService.saveToken(response.token);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        })
      );
  }

  logout(): void {
    // remove storage items and redirect to login route
    this.storageService.clean();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}

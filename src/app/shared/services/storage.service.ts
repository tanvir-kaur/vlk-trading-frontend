import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(user: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, user);
  }

  public getToken(): any {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(TOKEN_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}

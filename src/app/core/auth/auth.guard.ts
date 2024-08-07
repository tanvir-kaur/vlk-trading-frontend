import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
  return true;
};

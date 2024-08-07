import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    //Add token if the user is authenticated
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  } else {
    // Pass the request through unchanged.
    return next(req);
  }
};

const addAuthorizationHeader = (req: HttpRequest<any>) => {
  const storageService = inject(StorageService);
  const token = storageService.getToken();
  return req.clone({
    headers: req.headers
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
  });
};

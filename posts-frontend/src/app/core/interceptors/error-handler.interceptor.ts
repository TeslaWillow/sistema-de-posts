import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((err) => {
      // Here we map the error from the backend to a user-friendly message
      const errorMessage = err.error?.message || 'Ocurrió un error inesperado';
      errorService.handle(errorMessage);
      return throwError(() => err);
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error.status === 409) {
        errorMessage = error.error?.message || 'Conflito: A ação não pode ser realizada pois existem dados vinculados.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso não encontrado.';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos. Verifique os campos.';
      } else if (error.status >= 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
      }

      messageService.add({
        severity: 'error',
        summary: `Erro ${error.status}`,
        detail: errorMessage
      });

      return throwError(() => error);
    })
  );
};

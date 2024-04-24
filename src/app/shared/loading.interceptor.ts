import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { DadesObertesService } from '../services/dades-obertes.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const dadesObertesService = inject(DadesObertesService);
  dadesObertesService.setLoading(true);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        dadesObertesService.setLoading(false);
      }
      return event;
    })
  );
};

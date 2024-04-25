import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Platja } from '../types/platja';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private http = inject(HttpClient);

  fetchPlatgesCales(): Observable<Platja[]> {
    return this.http
      .get<Platja[]>('https://catalegdades.caib.cat/resource/p6c6-m5sd.json')
      .pipe(first());
  }
}

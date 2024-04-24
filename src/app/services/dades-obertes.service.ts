import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Contractes } from '../types/contractes';
import { Despeses } from '../types/despeses';
import { Viatges } from '../types/viatges';

@Injectable({
  providedIn: 'root',
})
export class DadesObertesService {
  private http = inject(HttpClient);

  private isLoading = signal(false);
  $isLoading = this.isLoading.asReadonly();

  fetchContractesPublics(): Observable<Contractes[]> {
    return this.http
      .get<Contractes[]>(
        'https://catalegdades.caib.cat/resource/anss-9wx4.json'
      )
      .pipe(first());
  }

  fetchDespesesPublics(): Observable<Despeses[]> {
    return this.http
      .get<Despeses[]>('https://catalegdades.caib.cat/resource/a8xp-nn78.json')
      .pipe(first());
  }

  fetchViatgesData(): Observable<Viatges[]> {
    return this.http
      .get<Viatges[]>('https://catalegdades.caib.cat/resource/xg9c-zgkc.json')
      .pipe(first());
  }

  setLoading(value: boolean): void {
    this.isLoading.set(value);
  }
}

import { Component, inject } from '@angular/core';
import { DadesObertesService } from './services/dades-obertes.service';

import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { FooterComponent } from './views/footer/footer.component';
import { ContractesComponent } from './components/contractes/contractes.component';
import { ViatgesComponent } from './components/viatges/viatges.component';
import { DespesesComponent } from './components/despeses/despeses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SpinnerOverlayComponent,
    FooterComponent,
    ContractesComponent,
    ViatgesComponent,
    DespesesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  dadesObertesService = inject(DadesObertesService);
  isLoading = this.dadesObertesService.$isLoading;
}

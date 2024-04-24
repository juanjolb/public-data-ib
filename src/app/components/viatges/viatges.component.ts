import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { formatCurrency, formatDate } from '@angular/common';
import { DadesObertesService } from '../../services/dades-obertes.service';
import { Viatges, ViatgesData } from '../../types/viatges';
import { DadesItemComponent } from '../../views/dades-item/dades-item.component';

@Component({
  selector: 'app-viatges',
  standalone: true,
  imports: [DadesItemComponent],
  template: `
    <app-dades-item
      [data]="viatgesData"
      [columns]="viatgesColumns"
      [series]="viatgesSeries"
      [moreInfo]="URL_VIATGES"
    >
      <h2 class="title" title>Viatges Càrrecs Públics Govern Illes Balears</h2>
      <h4 class="description" description>
        Informació dels viatges dels càrrecs públics o personal eventual dels
        gabinets del Govern de les Illes Balears i dels ens del sector públic
        instrumental.
      </h4>
    </app-dades-item>
  `,
  styles: `
      .title {
        font-size: 1.6em;
        margin-bottom: 20px;
    }
    .description {
        margin-bottom: 40px;
    }
  `,
})
export class ViatgesComponent implements OnInit {
  dadesObertesService = inject(DadesObertesService);

  URL_VIATGES =
    'https://catalegdades.caib.cat/Sector-p-blic/Viatges-C-rrecs-P-blics-Govern-Illes-Balears/xg9c-zgkc/about_data';

  viatgesColumns: ColDef[] = [
    {
      field: 'Data_inici',
      valueFormatter: (params) =>
        formatDate(params.value, 'dd/MM/yyyy', 'es-ES'),
    },
    {
      field: 'Data_fi',
      valueFormatter: (params) =>
        formatDate(params.value, 'dd/MM/yyyy', 'es-ES'),
    },
    { field: 'Responsable' },
    { field: 'Destí' },
    {
      field: 'Despesa_total',
      valueFormatter: (params) => formatCurrency(params.value, 'es-ES', '€'),
      comparator: (a, b) => a - b,
    },
    { field: 'Motivació' },
  ];
  viatgesData: ViatgesData[] = [];
  viatgesSeries = [
    {
      type: 'bar',
      xKey: 'Responsable',
      yKey: 'Despesa_total',
    },
  ];

  ngOnInit(): void {
    this.getViatgesData();
  }

  getViatgesData(): void {
    this.dadesObertesService.fetchViatgesData().subscribe((data) => {
      this.viatgesData = this.mapTransportManutencioData(data);
    });
  }
  mapTransportManutencioData(data: Viatges[]): ViatgesData[] {
    return data.map((viatge: Viatges) => {
      return {
        Data_inici: viatge.data_inici,
        Data_fi: viatge.data_fi,
        Responsable: viatge.responsable,
        Destí: viatge.dest,
        Despesa_total: parseFloat(viatge.despesa_total),
        Motivació: viatge.motivaci,
      };
    });
  }
}

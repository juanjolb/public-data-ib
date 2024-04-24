import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { formatCurrency, formatDate } from '@angular/common';
import { DadesObertesService } from '../../services/dades-obertes.service';
import { Despeses, DespesesData } from '../../types/despeses';
import { DadesItemComponent } from '../../views/dades-item/dades-item.component';

@Component({
  selector: 'app-despeses',
  standalone: true,
  imports: [DadesItemComponent],
  template: `
    <app-dades-item
      [data]="despesesData"
      [columns]="despesesColumns"
      [series]="despesesSeries"
      [moreInfo]="URL_DESPESES"
    >
      <h2 class="title" title>
        Despeses Transport i Manutenció Càrrecs Públics Govern Illes Balears
      </h2>
      <h4 class="description" description>
        Informació de les despeses de transport i manutenció dels càrrecs
        públics o personal eventual dels gabinets del Govern de les Illes
        Balears i dels ens del sector públic instrumental.
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
export class DespesesComponent implements OnInit {
  dadesObertesService = inject(DadesObertesService);

  URL_DESPESES =
    'https://catalegdades.caib.cat/Sector-p-blic/Despeses-Govern-Illes-Balears/a8xp-nn78/about_data';

  despesesColumns: ColDef[] = [
    {
      field: 'Data',
      valueFormatter: (params) =>
        formatDate(params.value, 'dd/MM/yyyy', 'es-ES'),
    },
    { field: 'Responsable' },
    { field: 'Assistents' },
    { field: 'Unitat_organica' },
    { field: 'Tipus_despesa' },
    { field: 'Motivació' },
    {
      field: 'Import',
      valueFormatter: (params) => formatCurrency(params.value, 'es-ES', '€'),
      comparator: (a, b) => a - b,
    },
    { field: 'Observacions' },
  ];
  despesesData: DespesesData[] = [];
  despesesSeries = [
    {
      type: 'bar',
      xKey: 'Responsable',
      yKey: 'Import',
    },
  ];

  ngOnInit(): void {
    this.getDespesesData();
  }

  getDespesesData(): void {
    this.dadesObertesService.fetchDespesesPublics().subscribe((data) => {
      this.despesesData = this.mapDespesesData(data);
    });
  }

  mapDespesesData(data: Despeses[]): DespesesData[] {
    return data.map((despesa) => {
      return {
        Data: despesa.data,
        Responsable: despesa.responsable,
        Tipus_despesa: despesa.tipus_de_despesa,
        Assistents: despesa.assistents,
        Unitat_organica: despesa.unitat_org_nica,
        Import: parseFloat(despesa?.import),
        Motivació: despesa?.motivaci,
        Observacions: despesa?.observacions,
      };
    });
  }
}

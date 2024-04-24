import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { formatCurrency, formatDate } from '@angular/common';
import { Contractes, ContractesData } from '../../types/contractes';
import { DadesObertesService } from '../../services/dades-obertes.service';
import { DadesItemComponent } from '../../views/dades-item/dades-item.component';

@Component({
  selector: 'app-contractes',
  standalone: true,
  imports: [DadesItemComponent],
  template: `
    <app-dades-item
      [data]="contractesData"
      [columns]="contractesColumns"
      [series]="contractesSeries"
      [moreInfo]="URL_CONTRACTES"
    >
      <h2 class="title" title>Contractes Públics Govern Illes Balears</h2>
      <h4 class="description" description>
        Dataset de l'activitat contractual del Govern de les Illes Balears i
        dels ens del seu sector públic instrumental. Informació extreta de la
        "Plataforma de Contratación del Sector Público".
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
export class ContractesComponent implements OnInit {
  dadesObertesService = inject(DadesObertesService);

  URL_CONTRACTES =
    'https://catalegdades.caib.cat/Sector-p-blic/Contractes-P-blics-Govern-Illes-Balears/anss-9wx4/about_data';

  contractesColumns: ColDef[] = [
    { field: 'Títol' },
    {
      field: 'Data_acord',
      valueFormatter: (params) =>
        formatDate(params.value, 'dd/MM/yyyy', 'es-ES'),
    },
    { field: 'Resultat_adjudicacio' },
    { field: 'Adjudicatari' },
    {
      field: 'Pressupost',
      valueFormatter: (params) => formatCurrency(params.value, 'es-ES', '€'),
      comparator: (a, b) => a - b,
    },
    {
      field: 'Import_adjudicació',
      valueFormatter: (params) => formatCurrency(params.value, 'es-ES', '€'),
      comparator: (a, b) => a - b,
    },
  ];

  contractesSeries = [
    {
      type: 'pie',
      legendItemKey: 'Adjudicatari',
      angleKey: 'Import_adjudicació',
      calloutLabelKey: 'Adjudicatari',
      sectorLabelKey: 'Import_adjudicació',
      sectorLabel: {
        color: 'white',
        formatter: (item: any) => formatCurrency(item!.value, 'es-ES', '€'),
      },
      showInLegend: false,
    },
  ];
  contractesData: ContractesData[] = [];

  ngOnInit(): void {
    this.getContractesData();
  }

  getContractesData(): void {
    this.dadesObertesService.fetchContractesPublics().subscribe((data) => {
      this.contractesData = this.mapContractesData(data);
    });
  }

  mapContractesData(data: Contractes[]): ContractesData[] {
    return data.map((contracte: Contractes) => {
      return {
        Títol: contracte.t_tol,
        Data_acord: contracte.data_acord_adjudicaci,
        Resultat_adjudicacio: contracte.resultat_adjudicaci,
        Adjudicatari: contracte.nom_adjudicatari,
        Pressupost: parseFloat(contracte.pressupost_expedient),
        Import_adjudicació: parseFloat(contracte.import_adjudicaci),
      };
    });
  }
}
